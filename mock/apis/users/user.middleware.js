const express = require('express'); 
const router = express.Router(); 
const url = require('url'); 

module.exports = (server) => {

    router.get("/user", (req, res, next) => {
        let url_path = url.parse(req.originalUrl, true)
        let query = url_path.query; 
        console.log(query.id)
        let users = server.db.getState().users; 
        let user = users.find( user => user.id == req.query.id)
        res.json(user)
    })

    router.post("/users", (req, res, next) => {
        success = server.db.getState().success; 
        res.json(success)
    }) 

    return router; 
}