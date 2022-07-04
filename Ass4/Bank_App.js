let bankId = 0, accountId=0, customerId=0;
const allBanks= [];
class Bank{
    constructor(bankName, bankAbbre)
    {
        this.bankName = bankName;
        this.bankAbbre = bankAbbre;
        this.bankId = bankId++;
    }

    static createNewBank(bankName,bankAbbre)
    {
        let [indexOfBank,isBankExist] = findbank(bankName,bankAbbre);
        if(isBankExist)  return[nill,"Bank Already Exists"];
        let newBank = new Bank(bankName,bankAbbre);
        allBanks.push(newBank);
        return newBank;
    }
    
    static findbank(bankName,bankAbbre)
    {
        for(let i=0; i<allBanks[i]; i++)
        {
            if(allBanks[i].bankName == bankName || allBanks[i].bankAbbre == bankAbbre)
            return [i,true];
        }
        return [-1,false];
    }
    

}

class Account{
    constructor(bank)
    {
        this.bank = bank;
        this.balance = 1000;
        this.account = accountId++;
    }

    isAccountExist(bankAbbre)
    {
        return this.bank.bankAbbre == bankAbbre;
    }

    isBalanceSufficient(amount)
    {
        return amount <= this.balance;
    }
}

class Customer
{
    constructor(firstName, lastName, account)
    {
        this.customerId = customerId++;
        this.totalBalance = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.account = account;
    }

    updateTotalBalance()
    {
        for(let i=0; i<this.account.length; i++)
        {
            totalBalance = this.totalBalance+this.account[i].balance;
        }
        return this.totalBalance;
    }

    deposit(amount, bankAbbre)
    {
        for(let i=0; i<this.account.length; i++)
        {
            if(this.account[i].bank.bankAbbre != bankAbbre)
            {
                console.log("Bank Abbre Incorrect");
                return false;
            }
        }
        this.account[i].balance = this.account[i].balance + amount;
        this.updateTotalBalance();
    }

    withdraw(amount, bankAbbre)
    {
        for(let i=0; i<this.account.length; i++)
        {
            if(this.account[i].balance < amount && this.account[i].bank.bankAbbre != bankAbbre)
            {
                console.log("Insufficient Balance");
                return false;
            }
        }
        this.account[i].balance = this.account[i].balance -amount;
        this.updateTotalBalance();
    }

    transfer(amount, creditCustomer, creditBankAbbre, debitBankAbbre)
    {
        let checkWithDraw = this.withdraw(amount, debitBankAbbre);
        if(!checkWithDraw)
        {
            console.log("Withdraw Failed")
            return false;
        }
        let checkDeposit = this.deposit(amount, creditBankAbbre);
        if(!checkDeposit)
        {
            console.log("Deposit Failed");
            this.deposit(amount, debitBankAbbre);
            return false;
        }
    }

    selfTransfer(amount, creditBankAbbre, debitBankAbbre)
    {
        this.transfer(amount, this, creditBankAbbre, debitBankAbbre);
    }
}