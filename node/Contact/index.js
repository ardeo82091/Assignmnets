const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const User = require('./model/User.js');
const JWTPayload = require('./model/authentication.js');
const Contact = require('./model/contact.js');

const [admin,message] = User.createAdmin("ankit","ankit@123","Ankit","Raj");
app.post("/api/v1/login",(req,resp)=>{
    const {userName,password}= req.body
    let [indexOfUser,isUsenameExist] = User.findUser(userName);
    if(!isUsenameExist || User.allUsers[indexOfUser].credential.password!= password)
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
})

app.post("/api/v1/createuser",(req,resp)=>{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    let {firstName,lastName,userName ,password,role} = req.body;
    let [newUser,message]=admin.createNewUser(firstName,lastName,userName,password,role);
    if(newUser == null )
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(201).send(newUser);
    return message;
})

app.get("/api/v1/getUser",(req,resp)=>{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    resp.status(201).send(User.allUsers)
})

app.put("/api/v1/updateUser",(req,resp)=>{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    let {userName,propertyToUpdate,value} = req.body;
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
})

app.post("/api/v1/createContact/:userName",(req,resp)=>{
    const isValidUser =  JWTPayload.isValidUser(req,resp)
    if(!isValidUser){
        return;
    }
    const {firstName,lastName} = req.body;
    const userName = req.params.userName;
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
})

app.get("/api/v1/getAllContacts/",(req,resp)=>{
    const isValidUser =  JWTPayload.isValidUser(req,resp)
    if(!isValidUser){
        return "unauthorized access"
    }
    const userName = req.body.userName;
    const [indexOfUser,isUserExist] = User.findUser(userName)
    if(!isUserExist){
        resp.status(504).send("User not Exist");
       return;
    }

    resp.status(200).send(User.allUsers[indexOfUser].contacts)
})

app.post("/api/v1/deleteUserContact/:userName",(req,resp)=>{
    const isValidUser =  JWTPayload.isValidUser(req,resp)
    if(!isValidUser){
        return "unauthorized access"
    }
    let userName = req.params.userName;
    let {firstName,lastName} = req.body;
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
})

app.post("/api/v1/adminDeleteUser",(req,resp)=>{
    const isValidAdmin =  JWTPayload.isValidAdmin(req,resp)
    if(!isValidAdmin){
        return;
    }
    let userName = req.body.userName;
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
})

app.post("/api/v1/createContactDetail/:userName/:firstName/:lastName",(req,resp)=>{
    const isValidUser =  JWTPayload.isValidUser(req,resp)
    if(!isValidUser){
        return "unauthorized access"
    }
    let userName = req.params.userName;
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
})

app.post("/api/v1/logout",(req,resp)=>{
    resp.cookie("myToken",'none',{
        expires: new Date(Date.now()+ 0*1000),
    })
    resp.status(200).send("User Logged out Successfully");
})

app.listen(8082,()=>{
    console.log("app is started at port 8082");
})