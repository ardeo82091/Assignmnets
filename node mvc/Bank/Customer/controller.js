const Customer = require("../view/customer")
const JWTPayload = require('../view/authentication.js');

async function createCustomer(req,resp)
{
    let {firstname, lastname,userName,password} = req.body;
    let [newCustomer,message] = await Customer.createNewCustomer(firstname, lastname,userName,password);
    if(newCustomer== null)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(201).send(newCustomer);
    return;
}

function getAllCustomer(req,resp)
{
    resp.status(201).send(Customer.allCustomers);
    return;
}

function getAllAccount(req,resp)
{
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
}

function withDraw(req,resp)
{
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
}

function deposit(req,resp)
{
    
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
}

function transfer(req,resp)
{
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
}

function selftransfer(req,resp)
{
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
}

module.exports = {createCustomer,getAllCustomer,getAllAccount,withDraw,deposit,transfer,selftransfer};