const JWTPayload = require('../view/authentication');
const User = require('../view/User.js')
function createContact(req,resp)
{
    const userName = req.params.userName;
    const isValidUser =  JWTPayload.isValidUser(req,resp,userName);
    if(!isValidUser){
        return;
    }
    const {firstName,lastName} = req.body;
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
       return;
    }
    let [newContact,message] = User.allUsers[indexOfUser].createNewContact(firstName,lastName);
    if(newContact==null)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(newContact);
    return message;
}

function getAllContacts(req,resp)
{
    const userName = req.params.userName;
    const isValidUser =  JWTPayload.isValidUser(req,resp,userName)
    if(!isValidUser){
        return "unauthorized access"
    }
    const [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist){
        resp.status(504).send("User not Exist");
       return;
    }

    resp.status(200).send(User.allUsers[indexOfUser].contacts)
}

function deleteContact(req,resp)
{
    let userName = req.params.userName;
    const isValidUser =  JWTPayload.isValidUser(req,resp,userName);
    if(!isValidUser){
        return "unauthorized access"
    }
    let {firstName,lastName} = req.params;
    let fullName = `${firstName} ${lastName}`;
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
       return;
    }
    let [isContactDeleted,message] = User.allUsers[indexOfUser].deleteUserContact(fullName);
    if(!isContactDeleted)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(message);
    return;
}

module.exports = {createContact,getAllContacts,deleteContact};