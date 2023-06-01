import { Router } from 'express';
const router: Router = Router();

//import controller of mainPage
import { viewContractPageController } from '../../../controller/mainPage/mainPageContractController';

// create mainPage Router
router.get('/',viewContractPageController)



export default router;