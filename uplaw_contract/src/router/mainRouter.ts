import {Router} from 'express'
const router: Router = Router()


// setup apiRouter
try {
    const apiRouter = require('./api/apiRouter')
    router.use('/api',apiRouter)

}catch(e:any){
    console.log(e.message)
}

export default router

