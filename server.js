const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }))



//* mongoDB connect
const connectionString = "mongodb+srv://whoisNP:NithyaPrakash123@cluster0-gihtk.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(connectionString,{ useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('Quiz-App')
        const questCollection = db.collection('question') 
        
        // ! POST REQUEST
        app.post('/questions',(req,res) => {
            questCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            }).catch(error => console.error(error))
        })

        // ! GET REQUEST
        app.get('/',(req,res)=>{
            db.collection('question').find().toArray()
            .then(results => {
                res.render('index.ejs',{ question:results })
                // console.log(results)
            }).catch(error => console.log(error))
        })
        // app.use()
        // app.listen()

    })
    .catch(console.error)

app.listen(3000,()=> {
    console.log('listening on 3000')
})


// todo https://zellwk.com/blog/crud-express-mongodb/