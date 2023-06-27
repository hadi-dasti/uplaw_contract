import { Router } from 'express';
const router: Router = Router();

// import controller
import { finalAcceptContractController,getAllContractController } from '../../../controller/acceptContract/acceptContractEmployeeController';

// accept contract router of employee 
router.post('/finalAccept/:employeeId', finalAcceptContractController);
router.get('/finalContract/readContract', getAllContractController);


export default router;