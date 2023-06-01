import { Router } from 'express';
const router: Router = Router();

// import controller 
import { registerAdmin, getAdmin,updateAdmin,deleteAdmin } from '../../../controller/admin/adminSiteController';

// import validation admin
import { adminValidation,adminUpdateValidation,validationAdminId } from '../../../validator/adminValidation/adminValidator';



//create route register admin
router.post('/singUp', adminValidation, registerAdmin);
router.get('/getAdmin/:id', validationAdminId, getAdmin);
router.patch('/updateAdmin/:id', validationAdminId, adminUpdateValidation, updateAdmin);
router.delete('/deleteAdmin/:id', validationAdminId, deleteAdmin);

export default router;
