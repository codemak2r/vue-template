const express = require('express');
const router = express.Router();
const url = require('url');


module.exports = (server) => {
    let articles = server.db.getState().articles; 
    let users = server.db.getState().users; 
    let failed = server.db.getState().failed;

    router.get("/articles", (req,res,next) => {
        let result; 
        let { page, limit } = req.query
        let { id } = req.query
        console.log(id)
        if(page && limit) {
            result = articles.filter((_, index) => index < limit * page && index >= limit * (page - 1))
        }
        else if(id) {
            result = articles.find(article => article.id == id)
        }else{
            result = failed;
        }
        res.json(result)
    })

	return router
}