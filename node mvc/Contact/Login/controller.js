const User = require('../view/User.js');
const JWTPayload = require('../view/authentication.js');
async function login(req, resp)
{
    const userName = req.params.userName;
    const password = req.body.password;
    let [indexOfUser,isUsenameExist] = User.findUser(userName);
    let isPassword = await User.allUsers[indexOfUser].comparePassword(password);
    if(!isUsenameExist || isPassword == false)
    {
        resp.status(504).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(User.allUsers[indexOfUser])
    const newToken = newPayload.createToken();
    resp.cookie("myToken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(200).send("Loggin Done");
}
module.exports = login;