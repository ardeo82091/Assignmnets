const Bank = require("./bank");
class Account {
    static accountId = 100;
    constructor(bankname) {
        this.accountId = Account.accountId++
        this.bankAbbrevation = bankname
        this.balance = 1000
    }

    isAccountexist(bankAbbrevation){
        return this.bankAbbrevation==bankAbbrevation;
    }

    isSufficientBalance(amount){
        return this.balance>=1000;
    }
}
module.exports = Account;