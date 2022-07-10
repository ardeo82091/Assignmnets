class Employee {
    constructor(firstName, lastName, fullName, dateOfBirth, age, salaryPM, annualSalary, empId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.salaryPM = salaryPM;
        this.annualSalary = annualSalary;
        this.empId = empId;
    }

    static #age(dateOfBirth)
    {
        const yearOfBirth = new Date(dateOfBirth);
        return 2022-yearOfBirth.getFullYear(); 
    }

    static createNewEmployee(fullName, dateOfBirth, salaryPM, empId)
    {
        let splitName = fullName.split(" ");
        let firstName = splitName[0];
        let lastName = splitName[1];
        let annualSalary = salaryPM * 12;
        let age = Employee.#age(dateOfBirth);
        let tempEmployee = new Employee(firstName, lastName, fullName, dateOfBirth, age, salaryPM, annualSalary, empId);
        return tempEmployee;
    }

    updateFirstName(newfirstName) {
    this.firstName = newfirstName;
    }
    
    updateLastName(newlastName) {
    this.lastName = newlastName;
    }
    
    updateSalary(newsalaryPM) {
    this.salaryPM = newsalaryPM;
    this.annualSalary=(newsalaryPM * 12);
    }
    
    updateEmployeeID(newEmpID) {
    this.empId = newEmpID;
    }
    
    updateDateOfBirth(newDateOfBirth){
    this.dateOfBirth = newDateOfBirth
    this.age = Employee.#age(newDateOfBirth);
    }
    
    update(propertyToUpdate,value)
    {
        switch (propertyToUpdate) {
            case 'firstName':this.updateFirstName(value)
                    break;
            case 'lastName':this.updateLastName(value)
                    break;
            case 'salaryPM':this.updateSalary(value)
                    break;
            case 'empID':this.updateEmployeeID(value)
                    break;
            case 'dateOfBirth':this.updateDateOfBirth(value)
            
            default: return "Wrong Property!"
        }
    }
}
const ankit = Employee.createNewEmployee("Ankit Raj","17 November 2000", 20000, "T000032");
console.log(ankit)
ankit.update("dateOfBirth", "17 November 1998")
console.log(ankit)