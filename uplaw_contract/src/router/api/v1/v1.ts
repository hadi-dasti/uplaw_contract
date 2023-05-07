import {Router,Request,Response} from 'express'
const router: Router = Router()
import employeeRouter from './Employee/employee'

//start application
try {
    //create and response main router application
    router.get('/', (req: Request, res: Response) => {
       return res.status(200).send(`<h1>hello main page </h1>`)
    })

    // create register and login employee router
    router.use('/employee', employeeRouter)
}catch (e:any) {
    console.log(e.message)
}







export default router