let loginResponse = {
    "loginSuccess" : {
        "status": 2000,
        "message": "login success"
    }, 
    "loginFailed" : {
        "status": 40001, 
        "message": "login failed"
    }, 
    "permissionDeny": {
        "status": 40002,
        "message": "permission denied" 
    }

}
module.exports = {
    loginResponse
}