const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const UserModel = require('./model/loginSchema')
const app = express()
const {uploadFile} = require('./s3')

app.use(express.json())



mongoose.connect('mongodb+srv://atharva05:atharva1418@cluster0.sdtoq.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected to DB")
})
app.post('/register', async (req, res) => {
    console.log(req.body)

    const data = req.body
    try {
        await UserModel.create({
            email: data.email,
            password: data.password,
            firstname: data.first_name,
            lastname: data.last_name,
            age: data.age,
            city: data.city,

        })
        const token = jwt.sign(
            {
                email: data.email
            },
            'secret123'
        )
        res.send({
            "status": 200,
            "message": "success",
            "jwt_token": token
        })
    } catch (err) {
        res.send({ Status: 201 })
    }

})
app.post('/login', async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email
    })
    if (!user) {
        res.send({ "error": "Email not found" })

    }
    else {
        if (user.password === req.body.password) {

            const token = jwt.sign(
                {
                    id: user.id
                },
                'secret123'
            )

            res.send({
                "status": 200,
                "message": "success",
                "jwt_token": token
            })
        }
    }
})
app.post('/images', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
  
    // apply filter
    // resize 
  
    const result = await uploadFile(file)
    
    console.log(result)
    // const description = req.body.description
    // res.send({imagePath: `/images/${result.Key}`})
  })

// app.post('/image',upload.single('image'),async(req,res)=>{
//     const file = req.file;
//      const result  = await uploadFile(file)
//     console.log(result)
//     res.send("ok")
// }) 
app.get('/', (req, res) => {
    res.send("hello world")
})
app.listen(3001, () => {
    console.log("listening at 3001");
})