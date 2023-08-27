import { Router } from 'express';
import {ContractUsController} from '../../../controller/contact_us/contactUsController';

//build router of instance Router Express
const router: Router = Router();

// create object instans of class contactUS
const contractUs = new ContractUsController();

// get router of contact us
router.get('/', contractUs.getContactUs.bind(contractUs));
// get link_emil and send message email in contact us router
router.get('/get_email/:employeeId', contractUs.getLinkEmail.bind(contractUs));
router.post('/send_email/sendEmail', contractUs.sendEmailToApp.bind(contractUs));

// route join on telegram
router.get('/get_telegram/:employeeId', contractUs.getJoinTelegram.bind(contractUs));

export default router;