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