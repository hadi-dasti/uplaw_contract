"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleController = exports.updateArticleController = exports.getOneArticleController = exports.getAllArticlesController = exports.createArticleController = void 0;
const article_1 = require("../../model/Article/article");
// build article
const createArticleController = (req, res) => {
    const { numberArticle, author, titleArticle, description, datePublishArticle } = req.body;
    try {
        if (!numberArticle || !author || !titleArticle || !description || !datePublishArticle) {
            return res.status(400).json({
                success: false,
                msg: "Please provide all required fields"
            });
        }
        ;
        const newArticle = {
            numberArticle,
            author,
            titleArticle,
            description,
            datePublishArticle: new Date(datePublishArticle),
        };
        article_1.articles.push(newArticle);
        return res.status(201).json({
            success: true,
            data: newArticle,
            msg: "successfully build Article page"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error + ${err.message}`
        });
    }
    ;
};
exports.createArticleController = createArticleController;
// get all articles
const getAllArticlesController = (req, res) => {
    try {
        if (!article_1.articles) {
            return res.status(404).json({
                success: false,
                msg: "Bad request Error"
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: article_1.articles,
            msg: "Successfully get all articles"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error:${err.message}`
        });
    }
    ;
};
exports.getAllArticlesController = getAllArticlesController;
// get one article with articleId
const getOneArticleController = (req, res) => {
    const { articleId } = req.params;
    try {
        //find Article with id article
        const readArticle = article_1.articles.find(article => article.numberArticle === articleId);
        if (!readArticle) {
            return res.status(404).json({
                success: false,
                msg: `Article with id ${articleId} not found`
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: readArticle,
            msg: "Successfully retrieved article"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error:${err.message}`
        });
    }
    ;
};
exports.getOneArticleController = getOneArticleController;
// update article
const updateArticleController = (req, res) => {
    const { articleId } = req.params;
    const update = Object.keys(req.body);
    const dataArticlesKey = ['numberArticle', 'author', 'titleArticle', 'description', 'datePublishArticle'];
    const isValidate = update.every(testKeys => dataArticlesKey.includes(testKeys));
    if (!isValidate) {
        return res.status(400).json({
            success: false,
            msg: 'Error Not isValidate keys of req.body'
        });
    }
    ;
    try {
        const articleToUpdate = article_1.articles.find(article => article.numberArticle === articleId);
        if (!articleToUpdate) {
            return res.status(404).json({
                success: false,
                msg: `No article found with id ${articleId}`
            });
        }
        ;
        update.forEach(key => {
            articleToUpdate[key] = req.body[key];
        });
        return res.status(200).json({
            success: true,
            data: articleToUpdate,
            msg: `update Article with id ${articleId}`
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Error updating article with id ${articleId} : ${err.message}`
        });
    }
    ;
};
exports.updateArticleController = updateArticleController;
//delete article
const deleteArticleController = (req, res) => {
    const { articleId } = req.params;
    try {
        // search article with numberArticle for delete
        const articleToDelete = article_1.articles.find(article => article.numberArticle === articleId);
        if (!articleToDelete) {
            return res.status(404).json({
                success: false,
                msg: `No article found with id ${articleId}`
            });
        }
        ;
        article_1.articles.splice(article_1.articles.indexOf(articleToDelete), 1);
        return res.status(200).json({
            success: true,
            msg: `Error deleting article with id ${articleId}`
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error deleting Article : ${err.message}`
        });
    }
    ;
};
exports.deleteArticleController = deleteArticleController;
