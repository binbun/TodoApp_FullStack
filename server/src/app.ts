import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import UserRoute from './routes/users';
import TodosRoute from './routes/todos';

const app = express();

app.use(cors());
app.use((express.json()));
app.use(express.urlencoded({ extended: false }));

app.use('', UserRoute);
app.use('', TodosRoute);

mongoose.connect('mongodb+srv://binbun:crushonli@todots.ml250.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port: ', port);
});