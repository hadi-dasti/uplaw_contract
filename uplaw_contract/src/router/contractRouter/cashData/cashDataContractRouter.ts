import { Router } from "express";

import { CashDataContractController } from '../../../controller/cashData/cashDataController';


const router: Router = Router();
 
// create object readCashData instanse of class cashDataContract
const cashDataContract = new CashDataContractController()

// get cash data router
router.get('/get_contract',cashDataContract.setCashContract.bind(cashDataContract));


export default router;