const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./src/Users.js');
const ToDoModel = require('./src/ToDos.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "gsdg23734dfhhjsqdq";

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());

mongoose.connect('mongodb+srv://vijaykarunanithi2003:CMT5Y2CToy9Gby9b@cluster0.2totnoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// mongodb+srv://vijaykarunanithi2003:CMT5Y2CToy9Gby9b@cluster0.2totnoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.post('/signup', async (req, res) => {
   const {name, email, password} = req.body;
   try{
    const User = await UserModel.create({
       name, 
       email,
       password: bcrypt.hashSync(password, salt)
    })
    res.status(200).json("Success");
   }
   catch(e){
    res.status(400).json(e);
   }
});

app.post('/login', async (req, res) => {
    const {email, password } = req.body;
    const UserDetail = await UserModel.findOne({email});
    if(UserDetail){
        const passOk = bcrypt.compareSync(password, UserDetail.password);
        if(passOk){
            jwt.sign({email, name: UserDetail.name, id: UserDetail._id}, secret,{}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json("Success");
            })
        }
        else{
            res.status(400).json("Incorrect Password!");
        }
    }
    else{
        res.status(400).json("Email not found");
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json("logged out!").status(200);
});

app.listen(5000, () => {
    console.log("server running in  port 5000");
});

app.post('/upload', async(req, res) => {
    const {title, data, id, state: Boolean} = req.body;
    try{
        const contentDoc = await ToDoModel.create({
            title,
            content: data,
            id,
            state: false
        })
        res.status(200).json("Success");
    }
    catch(e){
        res.status(400).json(e);
    }
});

app.get('/ongoing', async(req, res) => {
    const {token} = req.cookies;
    let id;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        id = info.id;
     });

     const todosDoc = await ToDoModel.find({id, state: false});
     res.status(200).json(todosDoc);
}); 

app.get('/completed', async(req, res) => {
    const {token} = req.cookies;
    let id;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        id = info.id;
     });

     const todosDoc = await ToDoModel.find({id, state: true});
            res.status(200).json(todosDoc);
});

app.delete('/deleteTodo', async(req, res) => {
    const {id} = req.body;
    try{
        const response = await ToDoModel.deleteOne({_id:id})
        res.status(200).json(response);
    }
    catch(e){
        res.status(400).json(e);
    }

})

app.put('/finishTodo', async(req, res) => {
    const {id} = req.body;
    const now = new Date();
    const localString = now.toLocaleString();
    try{
        const response = await ToDoModel.updateOne({_id:id}, {
            $set: {
                state: true,
                time: localString
            }
        })
        res.status(200).json("Updated successfully")
    }
    catch(e){
        res.status(200).json(e);
    }
})