import { Router } from 'express';
const router: Router = Router();

// import controller 
import { registerAdmin } from '../../../../controller/admin/adminSiteController';

// import validation admin
import { adminValidation } from '../../../../validator/adminValidation/adminValidator';



//create route register admin
router.post('/singUp', adminValidation, registerAdmin);

export default router;
