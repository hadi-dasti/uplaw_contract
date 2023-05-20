import {Router} from 'express'
const router: Router = Router()
import apiRouter from './api/apiRouter'

// setup apiRouter
try {   
    router.use('/api',apiRouter)

}catch(e:any){
    console.log(e.message)
}

export default router

