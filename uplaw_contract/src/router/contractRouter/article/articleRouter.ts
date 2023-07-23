import { Router } from 'express';
import {
    createArticleController,
    getAllArticlesController,
    getOneArticleController,
    updateArticleController,
    deleteArticleController
} from '../../../controller/articles/articleController';;


// setup router of Router Express
const router: Router = Router();

// create article route
router.post('/article_create', createArticleController);
//get all article
router.get('/articles_read', getAllArticlesController);
 //get one article
router.get('/articles_read/:articleId', getOneArticleController);
// update article 
router.patch('/article_update/:articleId', updateArticleController);
// delete article
router.delete('/article_delete/:articleId', deleteArticleController);



export default router;