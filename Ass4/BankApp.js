class Bank {
    static bankId = 0;
    static allBanks = []

    constructor(bankname, bankAbbrevation) {
        this.bankId = Bank.bankId++;
        this.bankname = bankname;
        this.bankAbbrevation = bankAbbrevation;
    }

    static createNewBank(bankname, bankAbbrevation) {
        let [indexOfBank, isBankexist, bankproperty] = this.findBank(bankname, bankAbbrevation)
        if (isBankexist) {
            return [nil,"Already Exists"];
        }
        let newBank = new Bank(bankname, bankAbbrevation)
        Bank.allBanks.push(newBank)
        return newBank
    }

    static findBank(bankAbbrevation) {
        if (this.allBanks.length == 0) {
            return [null, false]
        }
        for (let index = 0; index < Bank.allBanks.length; index++) {
            const element = Bank.allBanks[index];
            if (element.bankAbbrevation == bankAbbrevation) {
                return [index, true]
            }
        }
        return [null, false]
    }
}

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
        return this.balance>=amount;
    }
}


class Customer {
    static allCustomers = [];
    static customerId = 0;
    constructor(fullname) {
        this.customerId = ++Customer.customerId;
        this.fullname = fullname
        this.account = []
        this.totalBalance = 0
    }
    static createNewCustomer(firstname, lastname) {
        let fullname = `${firstname} ${lastname}`
        const newCustomer = new Customer(fullname)
        Customer.allCustomers.push(newCustomer)
        return newCustomer
    }

    static findCustomer(customerId) {
        for (let index = 0; index < Customer.allCustomers.length; index++) {
            const customer = Customer.allCustomers[index];
            if (customer.customerId == customerId) {
                return [index, true]
            }
        }
        return [-1, false]
    }

    updatetotalBalance() {
        if(this.account.length==0){
            return
        }
        let totalbalance = 0;
        for (let index = 0; index < this.account.length; index++) {
            const account = this.account[index];
            totalbalance +=  account.balance;
        }
        this.totalBalance = totalbalance;
    }

    createnewAccount(bankAbbrevation) {
        let [index, isBankexist] = Bank.findBank(bankAbbrevation)
        if (!isBankexist) {
            return [null, `No bank exit with name ${bankAbbrevation}`]
        }
        let bank = Bank.allBanks[index].bankAbbrevation
        const newAccount = new Account(bank)
        this.account.push(newAccount)
        this.updatetotalBalance()
    }

    isAccountExist(bankAbbrevation) {
        if (this.account.length == 0) {
            return [-1, false];
        }
        for (let index = 0; index < this.account.length; index++) {
            const account = this.account[index];
            if (account.bankAbbrevation == bankAbbrevation) {
                return [index, true]
            }
        }
        return [-2, false];
    }

    withdraw(amount, bankAbrre)
    {
        let [indexOfBank, isAccountexist] = this.isAccountExist(bankAbrre);
        if(isAccountexist==false) return [false, "Account not Exists"];
        if(this.account[indexOfBank].balance < amount ){console.log("Not Sufficient Balance") ;return [false, "Not Sufficient Balance"];}
        this.account[indexOfBank].balance -=  amount;
        this.updatetotalBalance();
        console.log(this.account[indexOfBank].balance);
        return [true, "Successfull Withdraw"];
    }

    deposit(amount, bankAbrre)
    {
        let [indexOfBank, isAccountExist] = this.isAccountExist(bankAbrre);
        console.log(indexOfBank, isAccountExist);
        if(isAccountExist==false) return [false, "Account not Exists"];
        this.account[indexOfBank].balance +=  amount;
        this.updatetotalBalance();
        return [true, "Successfully Deposit"];
    }

    transfer(amount, creditCustomer, creditBankAbbre, debitBankAbbre)
    {
        let [indexOfCustomer, customerExists] = Customer.findCustomer(creditCustomer);
        if(!customerExists) return [false,"Customer not exist"];
        let [checkWithDraw,info] = this.withdraw(amount, debitBankAbbre);
        console.log(checkWithDraw,info)
        if(!checkWithDraw)
        {
            return [false,"Withdraw Failed"];
        }
        let [checkDeposit,message] = Customer.allCustomers[indexOfCustomer].deposit(amount, creditBankAbbre);
        if(!checkDeposit)
        {
            this.deposit(amount, debitBankAbbre);
            return [false,"Deposit Failed"];
        }
        return[true,"Deposit Successfull"];
    }

    selfTransfer(amount, creditBankAbbre, debitBankAbbre)
    {
        let [transfer,message]=this.transfer(amount, this.customerId, creditBankAbbre, debitBankAbbre);
        return [transfer,message];
    }

}

const sbi = Bank.createNewBank("state bank of india", "sbi")
console.log(sbi);

const pnb = Bank.createNewBank("Punjab National Bank", "pnb")
console.log(pnb);

const canra = Bank.createNewBank("Canra Bank", "CB");
console.log(canra);

// const ankit = Customer.createNewCustomer("Ankit", "Raj")
// console.log(ankit)

// ankit.createnewAccount("sbi");
// console.log(ankit)
// ankit.createnewAccount("pnb");
// console.log(ankit)
// ankit.createnewAccount("CB");
// console.log(ankit);

// ankit.withdraw(2000,"pnb");
// console.log(ankit)
// ankit.deposit(1100,"pnb");
// console.log(ankit)
// ankit.selfTransfer(500,"sbi","pnb");
// console.log(ankit)

// const singh = Customer.createNewCustomer("Raj", "Singh")
// console.log(singh)

// singh.createnewAccount("sbi")
// singh.deposit(1100,"sbi");
// console.log(singh)
// ankit.transfer(280,2,"sbi","pnb")
// console.log(ankit)
// console.log(singh)