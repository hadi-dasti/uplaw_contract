import { Router } from "express";
const router: Router = Router();

// build controller of contract version 1
import { createContract_1,readContract_1,updateContract_1,deleteContract_1} from '../../../controller/contract/contractController_v1';

// build router contract of version 1
router.post('/buildContract_1', createContract_1);
router.get('/readContract/:contractId',readContract_1);
router.put('/updateContract/:contractId', updateContract_1);
router.delete('/deleteContract/:ContractId', deleteContract_1);


export default router;