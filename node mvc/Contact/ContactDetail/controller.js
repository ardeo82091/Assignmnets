const User = require('../view/User.js');
const JWTPayload = require('../view/authentication.js')
function createContactDetail(req,resp)
{
    let userName = req.params.userName;
    const isValidUser =  JWTPayload.isValidUser(req,resp,userName)
    if(!isValidUser){
        return "unauthorized access"
    }
    let [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist)
    {
        resp.status(504).send("User not Found");
        return;
    }
    let firstName = req.params.firstName;
    let lastName = req.params.lastName;
    let fullName = `${firstName} ${lastName}`;
    let [indexOfContact,isContactExist] = User.allUsers[indexOfUser].indexOfContact(fullName);
    if(!isContactExist)
    {
        resp.status(504).send("Contact doesnt Exist")
        return;
    }
    const {type,value} = req.body;
    let [isContactDetailsAdded,message] = User.allUsers[indexOfUser].contacts[indexOfContact].createContactDetails(type,value);
    if(!isContactDetailsAdded){
        resp.status(504).send(message)
        return;
    }
    resp.status(200).send(message);
    return message;
}

module.exports = createContactDetail;