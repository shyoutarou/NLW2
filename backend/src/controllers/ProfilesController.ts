import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import db from '../database/connection'
import nodemailer from 'nodemailer'
import { key } from '../auth.json'

export default {
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

        const token = jwt.sign(user[0], key, { expiresIn: 86400 })

        return res.status(200).json({ user: user[0], token })
    },
    async resetPassword(req: Request, res: Response) {
        const { email } = req.body

        const user = await db('users').where({
            email
        })

        if(!user[0]) {
            return res.status(404).send('user not found')
        }

        const token_expires = new Date()
        token_expires.setHours(token_expires.getHours() + 1)

        const password_token = crypto.randomBytes(16).toString('hex')

        await db('users').where({
            email
        }).update({
            token_expires,
            password_token
        })

        const test = await nodemailer.createTestAccount()

        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            secure: false,
            port: 587,
            auth: {
                user: test.user,
                pass: test.pass
            }
        })

        await transporter.sendMail({
            from: '"Breno Macêdo" <brenomacedo5432@gmail.com>',
            to: email,
            subject: "Proffy - Recuperação de senha.",
            text: `Olá! Foi solicitada a recuperação de senha da sua conta! Para isso, entre no link abaixo e utilize o token: ${password_token}`,
            html: `<div style="width: 400px; height: 400px; background-color: purple">
               ola mundo 
            </div>`
        })

        return res.status(200).send('token sent to your email')
    },
    async updatePassword(req: Request, res: Response) {
        const { new_pass, token } = req.body
        const { id } = req.params

        const user = await db('users').where({
            id
        })

        if(!user[0]) {
            return res.status(404).send('user not found')
        }

        if(user[0].password_token !== token) {
            return res.status(400).send('invalid token')
        }

        if(user[0].token_expires < Date.now()) {
            return res.status(400).send('token expired')
        }

        const password = await bcrypt.hash(new_pass, 10)

        await db('users').where({
            id
        }).update({
            password,
            password_token: null,
            token_expires: null
        })

        return res.status(400).send('password updated successfully')
    }
}