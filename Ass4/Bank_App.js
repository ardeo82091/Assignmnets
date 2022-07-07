class Bank
{
    static allBanks =[];
    static bankId =0;
    constructor(bankName, bankAbree)
    {
        this.bankId =Bank.bankId++;
        this.bankName = bankName;
        this.bankAbree = bankAbree;
    }

    static findBank(bankName, bankAbree)
    {
        for(let i=0; i<Bank.allBanks.length; i++)
        {
            if(Bank.allBanks[i].bankName == bankName || Bank.allBanks[i].bankAbree == bankAbree)
            return [i,true];
        }
        return [-1,false];
    }

    static findBankAbree(bankName, bankAbree)
    {
        if(allBanks.length ==0) return[nill, "No Bank Exists"]
        for(let i=0; i<allBanks.length; i++)
        {
            if(allBanks[i].bankName == bankName || allBanks[i].bankAbree == bankAbree)
            return [i,true];
        }
        return [-1,false];
    }

    static createNewBank(bankName, bankAbree)
    {
        let [indexofBank, isBankExists] = this.findBank(bankName,bankAbree);
        if(isBankExists) return [nill, "Bank Already Exists"];
        let newBank = new Bank(bankName, bankAbree);
        Bank.allBanks.push(newBank);
        return newBank;
    }
}

class Account
{
    static accountId = 100;
    cunstructor(bankName)
    {
        this.bank = bankName;
        this.accountId = Account.accountId++;
        this.balance = 1000;
    }
}

class Customer
{
    static allCustomer =[];
    static customerId = 0;
    constructor(firstName, lastName )
    {
        this.customerId = Customer.customerId++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.totalBalance = 0;
        this.account = [];
    }

    static createNewCustomer(firstName, lastName, bankName, bankAbree, amount)
    {
        let fullName = `${firstName} ${lastName}`;
        let newCustomer = new Customer(firstName, lastName);
        Customer.allCustomer.push(newCustomer)
        return newCustomer;
    }

    static findCustomer(customerId)
    {
        for(let i=0; i<allCustomer.length; i++)
        {
            if(allCustomer[i].customerId == customerId)
            return [i,true];
        }
        return ["No Customer Exist",false];
    }

    creatAccount(bankAbbrevation) {
        let [index, isBankexist] = Bank.findBank(bankAbbrevation);
        if (!isBankexist) 
            return [null, `Bank not Exist`];
        let newAccount = new Account(Bank.all_banks[index].bankAbbrevation);
        this.account.push(newAccount);
        updateTotalBalance();
    }

    updatetotalBalance()
    {
        let totalBalance = 0;
        if(this.accounts.length==0) return 0;
        for (let index = 0; index < this.accounts.length; index++)
        {
            totalBalance = totalBalance + this.accounts[index].balance
        }
        this.totalBalance = totalBalance;
    }

    isAccountExist(bankAbrre)
    {
        if(this.account.length==0)  return [-1, false];
        for(let i=0; i<this.account.length; i++)
        {
            if(this.account[i].bankAbrre == bankAbree) return [i, true];
        }
        return [nill,false];
    }

    withdraw(amount, bankAbrre)
    {
        let [indexOfBank, isAccountexist] = this.isAccountExist(bankAbrre);
        if(isAccountexist==false) return [false, "Account not Exists"];
        if(this.account[indexOfBank].balance < amount ) return [false, "Not Sufficient Balance"];
        this.account[indexOfBank].balance -=  amount;
        this.updatetotalBalance();
        return [true, "Successfull Withdraw"];
    }

    deposit(amount, bankAbrre)
    {
        let [indexOfBank, isAccountExist] = this.isAccountExist(bankAbrre);
        if(isAccountExist==false) return [false, "Account not Exists"];
        this.account[indexOfBank].balance +=  amount;
        this.updatetotalBalance();
        return [true, "Successfully Deposit"];
    }
    
    transfer(amount, creditCustomer, creditBankAbbre, debitBankAbbre)
    {
        let [customerId, customerExists] = findCustomer(creditCustomer);
        if(!customerExists) return;
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

const sbi = Bank.createNewBank("State Bank Of India", "SBI");
console.log(sbi);
const pnb = Bank.createNewBank("Punjab National Bank", "PNB");
console.log(sbi);
const ankit = Customer.createNewCustomer("Ankit", "Raj");
console.log(ankit);

ankit.creatAccount("SBI");
ankit.deposit(1000,"SBI");
ankit.withdraw(200, "SBI");



