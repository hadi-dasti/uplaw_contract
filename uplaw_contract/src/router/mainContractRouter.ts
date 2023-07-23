import { Router } from 'express';

import articleRouter from './contractRouter/article/articleRouter';
import contractHomePage from './contractRouter/mainPage/mainPageContract';
import contractChat from './contractRouter/chatRouter/chatRouter';
import contractEmployee from './contractRouter/employee/employeeRouter';
import contractAdmin from './contractRouter/admin/adminSite';
import contractModel from './contractRouter/contract/contractRouter_1';
import acceptContract from './contractRouter/acceptContract/acceptContractEmployee';



 // setup router of Router Express
const router: Router = Router();


// Implementation of contract homepage routers for version_1
router.use('/contract', contractHomePage);

// Implementation  of article in contract page
router.use('/contract/article', articleRouter);

// Implementation of contract chat_socket homepage routers for version_1
router.use('/contract/chat', contractChat);

// Implementation of contract employee routers for version_1
router.use('/contract/employee', contractEmployee);

// Implementation of contract admin routers for version_1
router.use('/contract/admin', contractAdmin);

// Implementation of contracts routers for version_1
router.use('/contract/contract_1', contractModel);

// Implementation of the router to accept the employee contract version_1
router.use('/contract/contract_1/acceptContract', acceptContract);


export default router;

