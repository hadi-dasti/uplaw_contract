import {Router,Request,Response} from 'express'
const router: Router = Router()
import employeeRouter from './Employee/employee'
import adminRouter from './admin/adminSite'

//start application

    //create and response main router application
    router.get('/', (req: Request, res: Response) => {
        return res.status(200).send(`<h1>hello main page </h1>`)
    });

    // create register and login employee router
    router.use('/employee', employeeRouter);

    // create admin router 
    router.use('/admin', adminRouter);
    
// handel Error Exception
router.use((err: any, req: Request, res: Response, next: any) => {
    console.log(err.stack)
    return res.status(500).json({
        success: false,
        msg: "Internal Server Error" + err.message
    });
});

export default router