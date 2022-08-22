const JWTPayload = require('../../view/authentication');
const User = require('../../view/user');
const Question = require('../../view/question');
const Tests = require('../../view/test');

let [admin,message] = [null,"Already exist"];
async function createAdmin()
{
    [admin,message] = await User.createAdmin("Ankit","Raj",20,"India","react","java","sql","ankit","ankit@123");
    return;
}

async function CreateUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const {firstName,lastName,exper,country,frontend,backend,dataBase,userName,password} = req.body;
    if (typeof firstName != "string") {
        resp.status(406).send("firstName is invalid");
        return;
    }

    if (typeof lastName != "string") {
        resp.status(406).send("lastName is invalid");
        return;
    }
    if (typeof exper != "number") {
        resp.status(406).send("experience is invalid");
        return;
    }

    if (typeof country != "string") {
        resp.status(406).send("country is invalid");
        return;
    }

    if (typeof frontend != "string") {
        resp.status(406).send("frontend is invalid");
        return;
    }

    if (typeof backend != "string") {
        resp.status(406).send("backend is invalid");
        return;
    }
    if (typeof dataBase != "string") {
        resp.status(406).send("dataBase is invalid");
        return;
    }

    if (typeof userName != "string") {
        resp.status(406).send("userName is invalid");
        return;
    }

    if (typeof password != "string") {
        resp.status(406).send("password is invalid");
        return;
    }

    let [isUserCreated,message] = await admin.createNewUser(firstName,lastName,exper,country,frontend,backend,dataBase,userName,password);
    if(isUserCreated == null)
    {
        resp.status(403).send(message);
        return;
    }
    resp.status(201).send(isUserCreated);
    return ;
}

function UpdateUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    let userName = req.body.userName;
    let {propertyToUpdate,value} = req.body;

    if (typeof userName != "string") {
        resp.status(406).send("userName is invalid");
        return;
    }

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

function AllUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const { limit, pageNumber } = req.body;
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send(User.allUsers.slice(startIndex+1,endIndex+1));
    return;
}

function NumberOfUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    resp.status(201).send(User.allUsers.length.toString());
    return;
}

function UserTotalScore(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(401).send("please Login with correct Id")
            return;
        }
        let [index,isUserExist] = User.findUser(userName);
        if(!isUserExist)
        {
            resp.status(403).send("User not Exist");
            return;
        }
        let [isAttempted,mess]= User.allUsers[index].allTestAttempted();
        if(!isAttempted)
        {
            resp.status(403).send(mess);
            return;
        }
        let testScore = User.allUsers[index].totalTestScore;
        let outOfScore = User.allUsers[index].outOffScore;
        resp.status(201).send(`Total score score by ${userName} is ${testScore} out off ${outOfScore}`);
        return;
    }
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not Exist");
        return;
    }
    let [isAttempted,mess]= User.allUsers[index].allTestAttempted();
    if(!isAttempted)
    {
        resp.status(403).send(mess);
        return;
    }
    let testScore = User.allUsers[index].totalTestScore;
    let outOfScore = User.allUsers[index].outOffScore;
    resp.status(201).send(`Total score score by ${userName} is ${testScore} out off ${outOfScore}`);
    return;
}

function deleteUser(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin"){
        resp.status(401).send("please specify this role to Banker")
        return;
    }
    const UserId = req.body.UserId ;
    let [UserIndex, isUserExists] = User.isUserIdExists(UserId );
    if(!isUserExists)
    {
        resp.status(403).send("User not Found");
        return;
    }
    (User.allUsers[UserIndex].isActive == true)? (User.allUsers[UserIndex].isActive = false) : (User.allUsers[UserIndex].isActive = true);
    resp.status(201).send("Updated");
    return;
}

module.exports = {UserTotalScore,CreateUser,AllUser,NumberOfUser,createAdmin,UpdateUser,deleteUser}