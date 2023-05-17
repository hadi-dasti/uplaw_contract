
const express = require('express')
import { join } from 'path'
import  cors  from 'cors'
import  dotenv from 'dotenv'

//setup mongodb
import  db  from './config/mongo'
db()

// main router app
import mainRouter from './router/mainRouter'


// setup  environment variable
dotenv.config({ path: join(__dirname,'../../uplaw_contract/.env') })
export const PORT = process.env.PORT 

//setup Express
export const app = express()



// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// path for uploadImage employee
app.use('/image',express.static(join(__dirname,'image')))

// main router
app.use(mainRouter)

// SETUP Application
app.listen(PORT, ()=> {
    console.log(`running application on port ${PORT}`)
})