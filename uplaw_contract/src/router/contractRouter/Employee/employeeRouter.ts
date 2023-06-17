import { Router } from 'express';
const router: Router = Router();

// Authorization for employee
import { authEmployee } from '../../../middleware/authEmployee/authEmployee';

//import employee controller 
import { employeeRegistration, employeeLogin, verifyLoginEmployee, getAllEmployee, getOeEmployee, employeeForgetPassword, resetPasswordEmployee, deleteEmployee } from '../../../controller/employee/employee';

// middleware for upload image employee
import uploadImage from '../../../middleware/upload/uploadImage';

// validation employee
import { validateRegisterEmployee, validateLoginEmployee, validateVerifyEmployee, validateForgetPasswordEmployee, validateResetPasswordEmployee, validateDeleteIDEmployee }
    from '../../../validator/employeeValidator/employeeValidation';

//create router employee 
router.post('/register', uploadImage.single('profileImage'), validateRegisterEmployee, employeeRegistration);
router.post('/login', validateLoginEmployee, employeeLogin);
router.post('/verifyEmployeeLogin', validateVerifyEmployee, verifyLoginEmployee);
router.get('/getAllEmployee', authEmployee, getAllEmployee);
router.get('/getOneEmployee/:id', authEmployee, getOeEmployee);
router.delete('/deleteEmployee/:id', validateDeleteIDEmployee, deleteEmployee);

// create router for forget and reset password  employee of database
router.post('/forgetNumberMobile', validateForgetPasswordEmployee, employeeForgetPassword);
router.post('/verify_mobileNumber_employee', validateResetPasswordEmployee, resetPasswordEmployee);



export default router;