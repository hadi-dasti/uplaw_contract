import {Router,Request,Response} from 'express'
const router: Router = Router()
import employeeRouter from './Employee/employee'
import adminRouter from './admin/adminSite'
import mainPage from './mainPage/mainPage';


//start application

    //create main page for application
     router.use('/mainPage', mainPage);
    
    // create register and login employee router
    router.use('/employee', employeeRouter);

    // create admin router 
    router.use('/admin', adminRouter);
    
//handel Error Exception
router.use((err: any, req: Request, res: Response, next: any) => {
    console.log(err.stack)
    return res.status(500).json({
        success: false,
        msg: "Internal Server Error" + err.message
    });
});

export default router