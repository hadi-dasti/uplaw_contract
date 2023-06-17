import { Router} from 'express';
const router: Router = Router();


    // Implementation of contract homepage routers for version_1
    import contractHomePage from './contractRouter/mainPage/mainPageContract';
    router.use('/contract', contractHomePage);

    // Implementation of contract employee routers for version_1
    import contractEmployee from './contractRouter/Employee/employeeRouter';
    router.use('/contract/employee', contractEmployee);

    // Implementation of contract admin routers for version_1
    import contractAdmin from './contractRouter/admin/adminSite';
    router.use('/contract/admin', contractAdmin);

    // Implementation of contracts routers for version_1
    import contractModel from './contractRouter/contract/contractRouter_1';
    router.use('/contract/contract_1', contractModel);


    

export default router

