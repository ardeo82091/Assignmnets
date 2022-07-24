
const Customer = require("../view/customer")
const JWTPayload = require('../view/authentication.js');
function createNewAccount(req,resp)
{
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
}

module.exports = {createNewAccount};