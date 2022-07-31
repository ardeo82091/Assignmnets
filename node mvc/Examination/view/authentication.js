const jwt = require("jsonwebtoken")
const Credential = require("./credentials")
class JWTPayload{
    static secretKey = "strongPassword";
    constructor(user){
        this.userName = user.credentials.userName
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.role = user.role
        this.exper = user.exper
    }
    createToken()
    {
        return jwt.sign(JSON.stringify(this),JWTPayload.secretKey)
    }
    static verifyCookie(token)
    {
        return jwt.verify(token,JWTPayload.secretKey)
    }

    static isValidateToken(req, resp, mytoken) {
        if (!mytoken) {
            return false
        }
        return JWTPayload.verifyCookie(mytoken)
    }


}

module.exports = JWTPayload;