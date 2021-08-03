import express, { Request, Response} from 'express';
import Todo from '../../models/todo';
import jwt from 'jsonwebtoken';


 const getTodos = async (req: Request, res: Response) => {
    const token = req.header('token');
    if(!token) {
        return res.status(400).json('Access denied')
    }
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'not authorized'
        });

        if (!decoded) return res.status(400).json({
            title: "Can not get data"
        })

        const todos = await Todo.find({ author: decoded.userId }).populate('author', 'username').exec();

        if (!todos) {
            return res.status(400).json({ message: "Can not find any todos!" })
        } else {
            return res.status(200).json({
                title: 'success',
                todos: todos
            })
        }
    })
}

 const postTodo = (req: Request, res: Response) => {
    // verify
    const token = req.header('token');
    if(!token) {
        return res.status(400).json('Access denied')
    }
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'not authorized'
        });

        if (!decoded) return res.status(400).json({
            title: "Can not get data"
        })

        let newTodo = new Todo({
            title: req.body.title,
            isCompleted: false,
            author: decoded.userId
        });

        newTodo.save(error => {
            if (error) return console.log(error);
            return res.status(200).json({
                title: "successfully added",
                todo: newTodo
            })
        })
    })
};

 const updateTodo = (req: Request, res: Response) => {
    const token = req.header('token');
    if(!token) {
        return res.status(400).json('Access denied')
    }
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        try {
            if (err) return res.status(401).json({
                title: 'not authorized'
            });

            if (!decoded) return res.status(400).json({
                title: "Can not get data"
            })

            // now we know token is valid
            const updatedTodo = await Todo.findOneAndUpdate({ author: decoded.userId, _id: req.params.todoId }, req.body)

            const todos = await Todo.find({ author: decoded.userId });

            //saved
            return res.status(200).json({
                title: 'success',
                todo: updatedTodo,
                todos: todos
            });
        } catch (err) {
            throw err
        }
    });
}

 const deleteTodo = (req: Request, res: Response) => {
    const token = req.header('token');
    if(!token) {
        return res.status(400).json('Access denied')
    }
    
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'not authorized'
        });

        if (!decoded) return res.status(400).json({
            title: "Can not get data"
        })

        // now we know token is valid
        const todo = await Todo.findOneAndDelete({ author: decoded.userId, _id: req.params.todoId })

        if (!todo) return res.status(400).json({ message: "Can not deleted post cuz it does not exist" })
        return res.status(200).json({
            title: 'success',
            todo: todo
        });
    });
}

export { getTodos, postTodo, updateTodo, deleteTodo }