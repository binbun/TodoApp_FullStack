import express, { Request, Response} from 'express';
import User from '../../models/user';
import Todo from '../../models/todo';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ITodo, IUser } from '../../types/todo';



// get admin route
 const getAllUserProfiles = async (req: Request, res: Response) => {
    try {
        const token = req.header('token');
        if(!token) {
            return res.status(400).json('Access denied')
        }
        jwt.verify(token, 'secretkey', async (err) => {
            if (err) return res.status(401).json({
                title: 'not authorized'
            });

            const users = await User.find();

            return res.status(200).json({
                title: 'success',
                users: users
            })
        })
    } catch (error) {
        throw error
    }
}

// get user route
 const signup = (req: Request, res: Response) => {
    try {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        });

        const adminCode = req.body.adminCode;
        if (adminCode === 'bindz') newUser.isAdmin = true;

        newUser.save(err => {
            if (err) {
                return res.status(400).json({
                    title: 'error',
                    error: 'Email already in use'
                })
            }
            return res.status(200).json({
                title: 'user successfully added'
            })
        })
    } catch (error) {
        throw error;
    }
};

 const login = (req: Request, res: Response) => {
    try {
        User.findOne({ email: req.body.email }, (err: String, user: IUser) => {
            if (err) return res.status(500).json({
                title: 'server error',
                error: err
            });
            if (!user) {
                return res.status(400).json({
                    title: 'user is not found',
                    error: 'invalid username or password'
                })
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'login failed',
                    error: 'invalid username or password'
                })
            }

            // authentication is done, give them a token
            let token = jwt.sign({ userId: user._id }, 'secretkey');
            
            return res.status(200).json({
                title: 'login successful',
                token,
                user
            });
        })
    } catch (error) {
        throw error
    }
};

 const getUserProfile = (req: Request, res: Response) => {
    try {
        const token = req.header('token');
        
        if(!token) {
            return res.status(400).json('Access denied')
        }
        jwt.verify(token, 'secretkey', async (err, decoded) => {
            if (err) return res.status(401).json({
                title: 'not authorized'
            });

            if (!decoded) return res.status(400).json({
                title: 'Can not find data'
            });

            const todos: ITodo[] = await Todo.find({ author: decoded.userId }).populate('author', 'username').exec();

            console.log(todos);
            
            return res.status(200).json({
                title: 'success',
                todos: todos,
            })
        })
    } catch (error) {
        throw error;
    }
}

export { getAllUserProfiles, signup, login, getUserProfile};