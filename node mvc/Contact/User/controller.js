const JWTPayload = require('../view/authentication');
const User = require('../view/User.js')

let [admin,message] = [null,"No Admin"];
async function createAdmin()
{
    [admin,message] = await User.createAdmin("ankit","ankit@123","Ankit","Raj");
    return;
}

async function createUser(req,resp)
{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    let {firstName,lastName,userName ,password,role} = req.body;
    let [newUser,message]=await admin.createNewUser(firstName,lastName,userName,password,role);
    if(newUser == null )
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(201).send(newUser);
    return message;
}

function getAllUser(req,resp)
{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin)
    {
        return;
    }
        resp.status(201).send(User.allUsers)
}

function updateUser(req,resp)
{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    let userName = req.params.userName;
    let {propertyToUpdate,value} = req.body;
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not exist");
        return;
    }
    const isUpdate = User.allUsers[indexOfUser].update(propertyToUpdate,value);
    if(!isUpdate){
        resp.status(504).send("User not Updated")
        return;
    }
    resp.status(201).send(User.allUsers);
    return;
}

function adminDeleteUser(req,resp)
{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    let userName = req.params.userName;
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
       return;
    }
    let [isUserDeleted,message] = admin.adminDeleteUser(userName);
    if(!isUserDeleted)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(201).send(message);
    return;
}

module.exports = {createUser,getAllUser,updateUser,adminDeleteUser,createAdmin};