import { Request, Response, NextFunction } from 'express'
import { key } from '../auth.json'
import jwt from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        return res.status(400).send('Sem token, irmão')
    }

    const token = req.headers.authorization.split(' ')

    if(token[0] !== 'Bearer') {
        return res.status(400).send('formato de token invalido!')
    }

    jwt.verify(token[1], key, (err, decoded) => {
        if(err) {
            return res.status(400).send('token invalido')
        }

        req.body.userId = decoded as any
        next()
    })
}