const JWTPayload = require('../../view/authentication');
const User = require('../../view/User.js')

let [admin,message] = [null,"No Admin"];
async function createAdmin()
{
    [admin,message] = await User.createAdmin("ankit","ankit@123","Ankit","Raj");
    return;
}

async function createUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    let {firstName,lastName,userName ,password,role} = req.body;

    if (typeof firstName != "string") {
        resp.status(406).send("First Name is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("Last Name is invalid");
        return;
    }

    if (typeof userName != "string" || userName == null) {
        resp.status(406).send("UserName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("First Name is invalid");
        return;
    }

    if (role != "user" ) {
        resp.status(406).send("Role is invalid");
        return;
    }

    let [newUser,message]=await admin.createNewUser(firstName,lastName,userName,password,role);
    if(newUser == null )
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(newUser);
    return message;
}

function getAllUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const { limit, pageNumber } = req.body;
    if (User.allUsers.length == 0) {
        return resp.status(403).send("No user Exist");
    }
    
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;
    resp.status(201).send(User.allUsers.slice(startIndex,endIndex));
    return;
}

function noOfUsers(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    resp.status(201).send(User.allUsers.length.toString());
    return;
}

function updateUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    let userName = req.body.userName;
    let {propertyToUpdate,value} = req.body;

    if (typeof propertyToUpdate != "string") {
        resp.status(406).send("popertyToUpdate is invalid");
        return;
    }

    if (typeof value != "string") {
        resp.status(406).send("value is invalid");
        return;
    }

    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not exist");
        return;
    }
    const isUpdate = User.allUsers[indexOfUser].update(propertyToUpdate,value);
    if(!isUpdate){
        resp.status(403).send("User not Updated")
        return;
    }
    resp.status(201).send(User.allUsers[indexOfUser]);
    return;
}

function deleteUser (req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const userId = req.body.userId;
    let [userIndex, isUserExists] = User.isUserIdExists(userId);
    if(!isUserExists)
    {
        resp.status(403).send("User not Found");
        return;
    }
    (User.allUsers[userIndex].isActive== true)? (User.allUsers[userIndex].isActive = false) : (User.allUsers[userIndex].isActive = true);
    resp.status(201).send("Updated");
    return;
}

module.exports = {createUser,getAllUser,updateUser,createAdmin,deleteUser,noOfUsers};