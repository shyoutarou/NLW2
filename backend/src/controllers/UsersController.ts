import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { key } from '../auth.json'
import db from '../database/connection'

export default {
    async createUser(req: Request, res: Response) {
        const { name, email, whatsapp, bio, password: uncryptedPass, avatar } = req.body

        const password = await bcrypt.hash(uncryptedPass, 10)

        await db('users').insert({
            name, email, whatsapp, bio, password, avatar
        })

        return res.send('Usuário criado com sucesso!')
    },
    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await db('users').where({
            email
        })

        if(!user[0]) {
            return res.status(400).send('Usuário ou senha incorretos')
        }

        if(!await bcrypt.compare(password, user[0].password)) {
            return res.status(401).send('Usuário ou senha incorretos')
        }

        delete user[0].password

        const token = jwt.sign(user[0], key, { expiresIn: '86400' })

        return res.status(200).json({ user: user[0], token })
    }
}