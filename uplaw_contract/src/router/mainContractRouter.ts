import { Router } from 'express';

import aboutMeRouter from './contractRouter/about_me/aboutMeRouter';
import contactUsRouter from './contractRouter/contact_us/contactUsRouter';
import articleRouter from './contractRouter/article/articleRouter';
import contractHomePageRouter from './contractRouter/mainPage/mainPageContract';
import contractChatRouter from './contractRouter/chatRouter/chatRouter';
import contractEmployeeRouter from './contractRouter/employee/employeeRouter';
import contractAdminRouter from './contractRouter/admin/adminSite';
import contractModelRouter from './contractRouter/contract/contractRouter_1';
import acceptContractRouter from './contractRouter/acceptContract/acceptContractEmployee';
import cashDataContractRouter from './contractRouter/cashData/cashDataContractRouter';
import registerAccountGoogleRouter from './contractRouter/account_google/registerAccountGoogleRouter';
import buildQueueEmailRouter from './contractRouter/queue_rabitmq/queueRouter';


 // setup router of Router Express
const router: Router = Router();


// Implementation of contract homepage routers for version_1
router.use('/contract', contractHomePageRouter);

// Implementation  of article in contract page
router.use('/contract/article', articleRouter);

// Implementation contact_us
router.use('/contract/contact_us', contactUsRouter);

// Implementation  of about_me in contract page
router.use('/contract/about_me', aboutMeRouter);

// Implementation of contract chat_socket homepage routers for version_1
router.use('/contract/chat', contractChatRouter);

// Implementation of contract employee routers for version_1
router.use('/contract/employee', contractEmployeeRouter);

// Implementation of contract admin routers for version_1
router.use('/contract/admin', contractAdminRouter);

// Implementation of contracts routers for version_1
router.use('/contract/contract_1', contractModelRouter);

// Implementation of the router to accept the employee contract version_1
router.use('/contract/contract_1/acceptContract', acceptContractRouter);

// Implementation router about cash information contract employee of model with redis
router.use('/contract/cash_contract', cashDataContractRouter);

//*Implementation router for register employee with account_google
router.use('/contract/account_google', registerAccountGoogleRouter);

//Implementation router for queue email for costumer
router.use('/contract/buildQueue', buildQueueEmailRouter);


export default router;

