import { Router } from 'express';

// controller for handel router refershToken
import { employeeRefreshTokenController } from '../../../controller/employee/employeeRefreshTokenController';



const router: Router = Router();

router.post('/', employeeRefreshTokenController);






export default router;