import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IPayload } from '../types/todo';

const TokenValidate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token');
    if(!token) {
        return res.status(400).json('Access denied')
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'bin') as IPayload

    req.userId = payload._id

    console.log(payload);
    
    next()
}

export { TokenValidate }