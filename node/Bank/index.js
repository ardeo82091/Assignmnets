const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const Customer = require("./view/customer")
const Bank = require("./view/bank");
const JWTPayload = require('./view/authentication.js');


app.post("/api/v1/createBank",(req, resp)=>{
    let {bankname, bankAbbrevation} = req.body;
    let [bank,message] = Bank.createNewBank(bankname, bankAbbrevation);
    if(bank == null)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(bank);
    return;
})

app.get("/api/v1/getAllBank",(req, resp)=>{
    resp.status(201).send(Bank.allBanks);
    return;
})

app.post("/api/v1/createCustomer",async (req, resp)=>{
    let {firstname, lastname,userName,password} = req.body;
    let [newCustomer,message] = await Customer.createNewCustomer(firstname, lastname,userName,password);
    if(newCustomer== null)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(201).send(newCustomer);
    return;
})

app.get("/api/v1/getAllCustomer",(req, resp)=>{
    resp.status(201).send(Customer.allCustomers);
    return;
})

app.post("/api/v1/login/:userName", async (req,resp)=>{
    const userName = req.params.userName;
    const password = req.body.password;
    let [indexOfUser,isCustomerExist] = Customer.findCustomer(userName);
    if(indexOfUser == -1)
    {
        resp.status(504).send("No user Exists with this userName")
        return;
    }
    let isPasswordMatch = await Customer.allCustomers[indexOfUser].comparePassword(password);
    if(!isCustomerExist || isPasswordMatch == false)
    {
        resp.status(504).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(Customer.allCustomers[indexOfUser])
    const newToken = newPayload.createToken();
    resp.cookie("myToken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(200).send("Loggin Done");
})

app.post("/api/v1/createNewAccount/:newCustomer",(req,resp)=>{
    let newCustomer = req.params.newCustomer;
    const isValidCustomer =  JWTPayload.isValidCustomer(req,resp,newCustomer)
    if(!isValidCustomer){
        return;
    }
    let bankAbbrevation = req.body.bankAbbrevation;
    let [isNewAccount,message] = Customer.createnewAccount(bankAbbrevation,newCustomer);
    if(isNewAccount == null)
    {
        resp.status(500).send(message);
        return;
    }
    resp.status(201).send(isNewAccount);
    return;
})

app.post("/api/v1/UserAllAccount/:userName",(req,resp)=>{
    let userName = req.params.userName;
    const isValidCustomer =  JWTPayload.isValidCustomer(req,resp,userName)
    if(!isValidCustomer){
        return;
    }
    let [flag,allAccount,message] = Customer.getUserAllAccount(userName);
    if(flag== false)
    {
        resp.status(500).send(message);
    }
    resp.status(200).send(allAccount);
})

app.post("/api/v1/withDraw/:userName",(req,resp)=>{
    let userName = req.params.userName;
    const isValidCustomer =  JWTPayload.isValidCustomer(req,resp,userName)
    if(!isValidCustomer){
        return;
    }
    let {amount,debitBankAbbrevation} = req.body;
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(504).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].withdraw(amount,debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(message);
    return;
})

app.post("/api/v1/deposit/:userName",(req,resp)=>{
    
    let userName = req.params.userName;
    const isValidCustomer =  JWTPayload.isValidCustomer(req,resp,userName)
    if(!isValidCustomer){
        return;
    }
    let {amount,creditBankAbbrevation} = req.body;
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(userName);
    if(!isCustomerExists)
    {
        resp.status(504).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].deposit(amount,creditBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(message);
    return;
})

app.post("/api/v1/transfer/:debitCustomer",(req,resp)=>{
    let debitCustomer = req.params.debitCustomer;
    const isValidCustomer =  JWTPayload.isValidCustomer(req,resp,debitCustomer)
    if(!isValidCustomer){
        return;
    }
    let {amount,creditCustomer,creditBankAbbrevation, debitBankAbbrevation} = req.body;
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(debitCustomer);
    if(!isCustomerExists)
    {
        resp.status(504).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amount, creditCustomer, creditBankAbbrevation, debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(message);
    return;
})

app.post("/api/v1/selftransfer/:creditCustomer",(req,resp)=>{
    let creditCustomer  = req.params.creditCustomer;
    const isValidCustomer =  JWTPayload.isValidCustomer(req,resp,creditCustomer)
    if(!isValidCustomer){
        return;
    }
    let {amount,creditBankAbbrevation, debitBankAbbrevation} = req.body;
    let [indexOfCustomer,isCustomerExists] = Customer.findCustomer(creditCustomer);
    if(!isCustomerExists)
    {
        resp.status(504).send("Not find any Customer with this username");
        return;
    }
    let [isAccountExists,message]=Customer.allCustomers[indexOfCustomer].transfer(amount, creditCustomer, creditBankAbbrevation, debitBankAbbrevation);
    if(!isAccountExists)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(message);
    return;
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