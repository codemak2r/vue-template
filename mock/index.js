// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const cors = require("./cors")
const init = require("./apis")
const walk = require("./walk")
const mockDir = './mock/apis'; 


function startServer() {
    walk(mockDir, (error, result) => {
        if(error){
            console.error("error"+error); 
        }else{
            let apis = init(result)
            server.use(cors);
            server.use(jsonServer.bodyParser);
            server.use(middlewares);
            server.use(apis.middleware);
            server.use(apis.db);
            server.listen(3000, function () {
                console.log('JSON Server is running on 3004');
            });
            
        }
    })
}

startServer()
