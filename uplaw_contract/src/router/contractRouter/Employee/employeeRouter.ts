import { Router } from 'express';

//* middelware router for employee
import verifyRefreshTokenRouter from './employeeRefreshTokenRouter';


// Authorization of employee
import { authEmployeeMiddleware } from '../../../middleware/authEmployee/authEmployee';

//import employee controller 
import { employeeRegistration, employeeLogin, verifyLoginEmployee, getAllEmployee, getOeEmployee, employeeForgetPassword, resetPasswordEmployee, deleteEmployee } from '../../../controller/employee/employee';

// middleware for upload image employee
import uploadImage from '../../../middleware/upload/uploadImage';

// validation employee
import { validateRegisterEmployee, validateLoginEmployee, validateVerifyEmployee, validateForgetPasswordEmployee, validateResetPasswordEmployee, validateDeleteIDEmployee }
    from '../../../validator/employeeValidator/employeeValidation';

    
//build router
const router: Router = Router();
    

//create router employee 
router.post('/register', uploadImage.single('profileImage'), validateRegisterEmployee, employeeRegistration);
router.post('/login', validateLoginEmployee, employeeLogin);
router.post('/verifyEmployeeLogin', validateVerifyEmployee, verifyLoginEmployee);

//build router middelware  for verify refreshToken  for generate new accessToken
router.use('/verify_refreshToken', verifyRefreshTokenRouter);

router.get('/getAllEmployee', authEmployeeMiddleware, getAllEmployee);
router.get('/getOneEmployee/:id',authEmployeeMiddleware, getOeEmployee);
router.delete('/deleteEmployee/:id', validateDeleteIDEmployee, deleteEmployee);

// create router for forget and reset password  employee of database
router.post('/forgetNumberMobile', validateForgetPasswordEmployee, employeeForgetPassword);
router.post('/verify_mobileNumber_employee', validateResetPasswordEmployee, resetPasswordEmployee);



export default router;