import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connection'

export default {
    async createUser(req: Request, res: Response) {
        const { name, email, whatsapp, bio, password: uncryptedPass, avatar } = req.body

        const password = await bcrypt.hash(uncryptedPass, 10)

        await db('users').insert({
            name, email, whatsapp, bio, password, avatar
        })

        return res.send('Usuário criado com sucesso!')
    }
}