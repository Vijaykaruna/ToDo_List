const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ToDoSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    id: {type: String, required: true},
    state: {type: Boolean, require:true},
    time: {type: String, require: false}
})

const ToDoModel = model("todos", ToDoSchema);
module.exports = ToDoModel;