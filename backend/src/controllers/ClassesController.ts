import { Request, Response, response } from 'express'
import db from '../database/connection'
import { convertHourToMinutes } from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: string
    from: string
    to: string
}

export default {
    async create(req: Request, res: Response) {
        const { subject, cost, schedule } = req.body
    
        const trx = await db.transaction()
        
        try {
            const { id } = req.params
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id: id
            })
        
            const class_id = insertedClassesIds[0]
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        
                const { week_day, from, to } = scheduleItem
        
                return {
                    week_day, from: convertHourToMinutes(from), to: convertHourToMinutes(to), class_id
                }
            })
        
            await trx('class_schedule').insert(classSchedule)
        
            await trx.commit()
        
            return res.status(201).send('classe cadastrada')
        } catch(err) {
            await trx.rollback()
            return res.status(400).json({error: "unexpected error"})
        }
    },

    async index(req: Request, res: Response) {
        const filters = req.query

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if(!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)
        const classes = await db('classes')
        .whereExists(function() {
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
        .select(['classes.*', 'users.*'])

        const schedules = await db('class_schedule').where({})

        return res.json(classes)
    },
    async userClasses(req: Request, res: Response) {
        const { id } = req.params

        const classes = await db('classes').where({ user_id: id })
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')

        res.status(200).json(classes)
    },
    async deleteClass(req: Request, res: Response) {
        const { id } = req.params
        await db('classes').where({id}).delete()
        res.status(200).send('classe deletada com sucesso')
    }
}