import { Router } from 'express';

import { AboutMeController } from '../../../controller/about_me/aboutMeController';



const router: Router = Router();

// Create a new instance of the AboutMeController
const aboutMeController = new AboutMeController();

// Define routes for creating and getting About_me object
router.post('/build/about_me', aboutMeController.createAboutMe.bind(aboutMeController));
router.get('/show/about_me', aboutMeController.getAboutMe.bind(aboutMeController));


export default router;