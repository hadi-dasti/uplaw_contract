"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../../../controller/articles/articleController");
;
// setup router of Router Express
const router = (0, express_1.Router)();
// create article route
router.post('/article_create', articleController_1.createArticleController);
//get all article
router.get('/articles_read', articleController_1.getAllArticlesController);
//get one article
router.get('/articles_read/:articleId', articleController_1.getOneArticleController);
// update article 
router.patch('/article_update/:articleId', articleController_1.updateArticleController);
// delete article
router.delete('/article_delete/:articleId', articleController_1.deleteArticleController);
exports.default = router;
