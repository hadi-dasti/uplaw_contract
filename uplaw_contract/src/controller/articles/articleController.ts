import type { Request, Response } from "express";
import {Article,articles } from '../../model/Article/article';



// build article
export const createArticleController = (req: Request, res: Response): Response=> {
    
    const { numberArticle, author, titleArticle, description, datePublishArticle } = req.body;
    
    try {
          
        if (!numberArticle || !author || !titleArticle || !description || !datePublishArticle) {
            return res.status(400).json({
                success: false,
                msg: "Please provide all required fields"
            });
        };
          
        const newArticle: Article = {
            numberArticle,
            author,
            titleArticle,
            description,
            datePublishArticle: new Date(datePublishArticle),
        };

        articles.push(newArticle);

        return res.status(201).json({
            success: true,
            data: newArticle,
            msg: "successfully build Article page"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error + ${err.message}`
        });
    };
};

// get all articles
export const getAllArticlesController = (req: Request, res: Response): Response=> {

    try {

        if (!articles) {
            return res.status(404).json({
                success: false,
                msg: "Bad request Error"
            });
        };

        return res.status(200).json({
            success: true,
            data: articles,
            msg: "Successfully get all articles"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error:${err.message}`
        });
    };
};

// get one article with articleId
export const getOneArticleController = (req: Request, res: Response): Response=> {
    const { articleId } = req.params;
        
    try {
        //find Article with id article
        const readArticle = articles.find(article => article.numberArticle === articleId);
        
        if (!readArticle) {
            return res.status(404).json({
                success: false,
                msg: `Article with id ${articleId} not found`
            });
        };

        return res.status(200).json({
            success: true,
            data: readArticle,
            msg: "Successfully retrieved article"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error:${err.message}`
        });
    };
};

// update article
export const updateArticleController = (req: Request, res: Response):Response => {

    const { articleId } = req.params;
    
    const update = Object.keys(req.body);
    const dataArticlesKey = ['numberArticle', 'author', 'titleArticle', 'description', 'datePublishArticle'];
    const isValidate = update.every(testKeys => dataArticlesKey.includes(testKeys));

    if (!isValidate) {
        return res.status(400).json({
            success: false,
            msg: 'Error Not isValidate keys of req.body'
        });
    };

    try {
        const articleToUpdate = articles.find(article => article.numberArticle === articleId);
        if (!articleToUpdate) {
            return res.status(404).json({
                success: false,
                msg: `No article found with id ${articleId}`
            });
        };

        update.forEach(key => {
            articleToUpdate[key] = req.body[key]
        });

        return res.status(200).json({
            success: true,
            data: articleToUpdate,
            msg: `update Article with id ${articleId}`
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Error updating article with id ${articleId} : ${err.message}`
        });
    };
};

 //delete article
export const deleteArticleController = (req: Request, res: Response):Response => {
    const { articleId } = req.params;
    try {
        // search article with numberArticle for delete
        const articleToDelete = articles.find(article => article.numberArticle === articleId);

        if (!articleToDelete ) {
            return res.status(404).json({
                success: false,
                msg: `No article found with id ${articleId}`
            });
        };

         articles.splice(articles.indexOf(articleToDelete), 1);
       
        return res.status(200).json({
            success: true,
            msg: `Error deleting article with id ${articleId}`
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error deleting Article : ${err.message}`
        });
    };
};
 