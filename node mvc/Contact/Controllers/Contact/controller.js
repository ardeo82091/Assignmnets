const JWTPayload = require('../../view/authentication');
const User = require('../../view/User.js')
function createContact(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const {firstName,lastName} = req.body;

    if (typeof firstName != "string") {
        resp.status(406).send("Firstname is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("LastName is invalid");
        return;
    }

    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not Exist");
       return;
    }
    let [newContact,message] = User.allUsers[indexOfUser].createNewContact(firstName,lastName);
    if(newContact==null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newContact);
    return message;
}

function getAllContacts(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist){
        resp.status(403).send("User not Exist");
       return;
    }
    const { limit, pageNumber } = req.body;
    if (User.allUsers[indexOfUser].contacts.length == 0) {
        resp.status(201).send(User.allUsers[indexOfUser].contacts);
        return;
    }
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;

    resp.status(201).send(User.allUsers[indexOfUser].contacts.slice(startIndex,endIndex))
    return;
}

function noOfContacts(req,resp)
{
    const userName = req.params.userName;
    const [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist){
        resp.status(403).send("User not Exist");
       return;
    }
    resp.status(201).send(User.allUsers[indexOfUser].contacts.length.toString());
    return;
}

function deleteContact(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }
    const [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist){
        resp.status(403).send("User not Exist");
       return;
    }
    const contactId = req.body.contactId;
    let [contactIndex, isUserExists] = User.allUsers[indexOfUser].isContactIdExists(contactId);
    const user = User.allUsers[indexOfUser];
    (user.contacts[contactIndex].isContactActive== true)? (user.contacts[contactIndex].isContactActive= false) : (user.contacts[contactIndex].isContactActive = true);
    resp.status(201).send("Updated");
    return;
}

function updateContact (req,resp)
{
    const {userName,firstName,lastName} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload == false)
    {
        resp.status(401).send("Login require");
        return;
    }
    if(newPayload.userName != userName){
        resp.status(401).send("please login with correct userName")
        return;
    }

    let {propertyToUpdate,value} = req.body;
    if (typeof propertyToUpdate != "string") {
        resp.status(406).send("popertyToUpdate is invalid");
        return;
    }

    if (typeof value != "string") {
        resp.status(406).send("value is invalid");
        return;
    }

    const fullName= `${firstName} ${lastName}`
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not exist");
        return;
    }

    let [indexOfContact,isContactExist] = User.allUsers[indexOfUser].indexOfContact(fullName);
    if(!isContactExist)
    {
        resp.status(403).send("Contact Not Found");
        return;
    }
    const isUpdate = User.allUsers[indexOfUser].contacts[indexOfContact].update(propertyToUpdate,value);
    if(!isUpdate){
        resp.status(403).send("User not Updated")
        return;
    }
    resp.status(201).send(User.allUsers[indexOfUser].contacts[indexOfContact]);
    return;
}

module.exports = {createContact,getAllContacts,noOfContacts,deleteContact,updateContact};