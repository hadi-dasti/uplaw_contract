import {Router} from 'express'
const router: Router = Router()
//import employee controller 
 import {employeeRegistration,employeeLogin,verifyLoginEmployee,getAllEmployee,getOeEmployee} from '../../../../controller/employee/employee'


//create router employee 
router.post('/register', employeeRegistration)
router.post('/login', employeeLogin)
router.post('/verifyEmployeeLogin',verifyLoginEmployee)
router.get('/getAllEmployee', getAllEmployee)
router.get('/getOneEmployee/:id', getOeEmployee)


// create router for forget and reset employee


export default router