import {Router} from 'express'
const router: Router = Router()

//start application
try {
    const employeeRouter = require('./Employee/employee')
    router.use('/employee',employeeRouter)
}catch (e:any) {
    console.log(e.message)
}







export default router