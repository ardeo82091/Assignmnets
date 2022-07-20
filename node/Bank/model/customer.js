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