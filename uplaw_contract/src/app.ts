
import  express from "express";

import * as dotenv from 'dotenv'

//mongodb
import  db  from './config/mongo'
db()

// main router app
import mainRouter from './router/mainRouter'


// setup  environment variable
dotenv.config()
const port = process.env.PORT || 3000

//start app
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', mainRouter)

// SETUP API 
app.listen(port, ()=> {
    console.log(`running application on port ${port}`)
})