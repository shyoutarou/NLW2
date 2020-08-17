import { Request, Response } from 'express'
import db from '../database/connection'

export default {
    async createFavorite(req: Request, res: Response) {
        const { user_id, favorite_id } = req.body
        await db('favorites').insert({
            user_id,
            favorite_id
        })
        res.send('Favorited!')
    },
    async deleteFavorite(req: Request, res: Response) {
        const { user, favorite } = req.params
        await db('favorites').where({
            user_id: user, favorite_id: favorite
        }).delete()
        res.send('Delted!')
    },
    async listFavorite(req: Request, res: Response) {
        const { user_id } = req.query
        const favorites = await db('favorites').where({ user_id })

        if(favorites.length === 0) {
            return res.json([])
        }
        

        const idsArray = favorites.map(favorite => favorite.user_id)

        var query = ''

        idsArray.forEach((id, index) => {
            if(index === 0) {
                query = query+'`users`.`id` = '+`${id}`+' '
            } else {
                query = query+'OR `users`.`id` = '+`${id}`+' '
            }
        })

        const users = await db('users').whereRaw(query)
        return res.json(users)

    }
}