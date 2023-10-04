"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutMeController_1 = require("../../../controller/about_me/aboutMeController");
const router = (0, express_1.Router)();
// Create a new instance of the AboutMeController
const aboutMeController = new aboutMeController_1.AboutMeController();
// Define routes for creating and getting About_me object
router.post('/build/about_me', aboutMeController.createAboutMe.bind(aboutMeController));
router.get('/show/about_me', aboutMeController.getAboutMe.bind(aboutMeController));
exports.default = router;
