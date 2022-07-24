
const Bank = require("../view/bank");

function createBank(req,resp)
{
    let {bankname, bankAbbrevation} = req.body;
    let [bank,message] = Bank.createNewBank(bankname, bankAbbrevation);
    if(bank == null)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(200).send(bank);
    return;
}

function getAllBank(req,resp)
{
    resp.status(201).send(Bank.allBanks);
    return;
}

module.exports = {createBank,getAllBank};