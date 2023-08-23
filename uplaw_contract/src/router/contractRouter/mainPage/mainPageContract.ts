import { Router } from 'express';


//import controller of mainPage
import { viewContractPageController} from '../../../controller/mainPage/mainPageContractController';

const router: Router = Router();

// create mainPage Router
router.get('/',viewContractPageController)



export default router;