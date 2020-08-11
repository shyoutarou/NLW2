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

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        await transporter.sendMail({
            from: '"Proffy" <brenomacedo5432@gmail.com>', // sender address
            to: email,
            subject: "Redefinição de Senha - Proffy", // Subject line
            text: "Foi solicitada a redefinição da sua senha na nossa plataforma! Para prosseguir, entre no link a seguir e preencha os campos: ", // plain text body
            html: `<div style="background-color: #8257E5; width: 500px; height: 400px;">
                <h1 style="color: white; font-size: 28px; text-align: center; padding: 40px;">Redefinição
                de senha - Proffy</h1>
                <h1 style="color: white; font-size: 20px; text-align: justify; padding: 0 24px;">Olá, ${user[0].name}!
                Foi solicitada a redefinição da sua senha na nossa plataforma! Para prosseguir, clique no
                botão abaixo e preencha os campos para completar o processo!</h1>
                <a style="text-decoration: none;" href="http://localhost:3000/redefine-password/${user[0].id}/${password_token}">
                    <div style="text-decoration: none; cursor: pointer; width: 197px; height: 56px; background-color: #04BF58; border-radius: 8px; margin: 0 auto;">
                        <p style="color: white; text-align: center; line-height: 56px;">Redefinir senha</p>
                    </div>
                </a>
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

        return res.status(200).send('password updated successfully')
    }
}