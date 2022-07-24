const jwt = require("jsonwebtoken")
class JWTPayload{
    static secratekey = "strongPassword";
    constructor(user){
        this.userName = user.credentials.userName;
        this.fullName = user.fullName;
        this.customerID = user.customerID;
    }
    createToken()
    {
        return jwt.sign(JSON.stringify(this),JWTPayload.secratekey)
    }
    static verifyCookie(token)
    {
        return jwt.verify(token,JWTPayload.secratekey)
    }
    static isValidCustomer(req,resp,userName)
    {
        const myToken = req.cookies["myToken"];
        if(!myToken)
        {
            resp.status(504).send("Login required");
            return false
        }

        const newPayload = JWTPayload.verifyCookie(myToken);
        if(newPayload.userName != userName)
        {
            resp.status(504).send("User Login Required");
            return false
        }
        return true
    }
}

module.exports = JWTPayload;