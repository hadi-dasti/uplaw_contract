import {Router} from 'express'
const router: Router = Router()
//import employee controller 
 import {employeeRegistration,employeeLogin,verifyLoginEmployee} from '../../../../controller/employee/employee'


//create rout employee 
router.post('/register', employeeRegistration)
router.post('/login', employeeLogin)
router.post('/verifyEmployeeLogin',verifyLoginEmployee)





export default router