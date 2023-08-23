import { Router } from "express";
import passport from "passport";
import { RegisterAccountGoogleController} from './../../../controller/accoun_Google/registerAcountGoogleController';
import { authAccountGoogleEmployee} from '../../../middleware/authEmployee/authGoogleEmployee';
//build router of instance Router Express
const router: Router = Router();

// Create an instance of the RegisterAccountGoogleController class
const registerAccountGoogle = new RegisterAccountGoogleController();

// Route for registering with Google
router.get('/register_google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful authentication with Google
router.get('/callbackUrl',
    passport.authenticate('google', { session: false, failureRedirect: '/api/v1/contract' }),
    authAccountGoogleEmployee,
    registerAccountGoogle.handleGoogleRedirect.bind(registerAccountGoogle));



export default router;