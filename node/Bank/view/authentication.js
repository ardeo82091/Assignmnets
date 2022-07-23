const jwt = require("jsonwebtoken")
const Credential = require("./credential")
class JWTPayload{
    static secratekey = "strongPassword";
    constructor(user){
        this.userName = user.credential.userName;
        this.fullName = user.fullName;
    }
    createToken()
    {
        return jwt.sign(JSON.stringify(this),JWTPayload.secratekey)
    }
    static verifyCookie(token)
    {
        return jwt.verify(token,JWTPayload.secratekey)
    }
    static isValidCustomer(req,resp)
    {
        const myToken = req.cookies["myToken"];
        if(!myToken)
        {
            resp.status(504).send("Login required");
            return false
        }

        const newPayload = JWTPayload.verifyCookie(myToken);
        if(!newPayload.isActive)
        {
            resp.status(504).send("User Login Required");
            return false
        }
        return true
    }
}

module.exports = JWTPayload;