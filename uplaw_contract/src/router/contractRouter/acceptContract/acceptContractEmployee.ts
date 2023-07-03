import { Router } from 'express';
const router: Router = Router();

// import controller
import {
    finalAcceptContractController,
    getAllContractController,
    sendAcceptContractController,
} from '../../../controller/acceptContract/acceptContractEmployeeController';


// accept contract router of employee 
router.post('/finalAccept/buildAcceptContract', finalAcceptContractController);

//Get  All contractAccept
router.get('/finalContract/readContract', getAllContractController);

// send AcceptContract to Admin
router.post('/finalContract/readContractAccept/sendAcceptContract', sendAcceptContractController);



export default router;