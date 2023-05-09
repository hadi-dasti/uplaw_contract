import { Router } from 'express'
const router: Router = Router()

//import employee controller 
 import {employeeRegistration,employeeLogin,verifyLoginEmployee,getAllEmployee,getOeEmployee,employeeForgetNumberMobile,verifyNumberMobileEmployee} from '../../../../controller/employee/employee'

// middleware for upload image employee
import uploadImage  from '../../../../middleware/upload/uploadImage'

//create router employee 
router.post('/register', uploadImage.single('profileImage'), employeeRegistration)
router.post('/login', employeeLogin)
router.post('/verifyEmployeeLogin',verifyLoginEmployee)
router.get('/getAllEmployee', getAllEmployee)
router.get('/getOneEmployee/:id', getOeEmployee)


// create router for forget and reset mobileNumber employee of database
router.post('/forgetNumberMobile', employeeForgetNumberMobile)
router.post('/verify_mobileNumber_employee',verifyNumberMobileEmployee)



export default router