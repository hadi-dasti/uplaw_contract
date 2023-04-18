import {Router} from 'express'
const router: Router = Router()
import employeeRouter from './Employee/employee'
//start application
try {
    router.use('/employee',employeeRouter)
}catch (e:any) {
    console.log(e.message)
}







export default router