import { Router } from 'express';
const router: Router = Router();

//import controller of mainPage
import { viewContractPage} from '../../../../controller/mainPage/mainPage'

// create mainPage Router
router.get('/viewContract',viewContractPage)



export default router;