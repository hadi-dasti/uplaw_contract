import {Router} from 'express'
const router: Router = Router()
import v1Router from './v1/v1'



// setup version 1 api
try{   
    router.use('/v1',v1Router)

}catch(err:any){
    console.log(err.message)
}

export default router