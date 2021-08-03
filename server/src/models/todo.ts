import { ITodo } from '../types/todo'
import { model, Schema } from "mongoose"

const todoSchema: Schema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model<ITodo>("Todo", todoSchema)