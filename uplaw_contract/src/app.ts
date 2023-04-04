import express from 'express'


// main router app
import mainRouter from './router/mainRouter'


// setup  environment variable
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3000

//start app
const app  = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', mainRouter)

// SETUP API 
app.listen(port, ():void => {
    console.log(`running application on port ${port}`)
})