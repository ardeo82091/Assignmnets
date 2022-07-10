class Student {
    constructor(firstName, lastName, fullName, dateOfBirth, age, semCgpaArray, finalCgpa, semGradesArr, finalGrade, yearOfEnroll, yearOfPassing, noOfYearsToGraduate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.semCgpaArray = semCgpaArray;
        this.finalCgpa = finalCgpa;
        this.semGradesArr = semGradesArr;
        this.finalGrade = finalGrade;
        this.yearOfEnroll = yearOfEnroll;
        this.yearOfPassing = yearOfPassing;
        this.noOfYearsToGraduate = noOfYearsToGraduate;
    }

    static #noOfYearsToGraduate(yearOfPassing,yearOfEnroll)
    {
        return  yearOfPassing - yearOfEnroll;
    }

    static #age(dateOfBirth)
    {
        const yearOfBirth = new Date(dateOfBirth);
        return 2022-yearOfBirth.getFullYear(); 
    }
    static #semGradesArr(semCgpaArray)
    {
        let semGradesArray=[]
       for(let i=0; i<semCgpaArray.length; i++)
        {
            if (semCgpaArray[i]>=9 && semCgpaArray[i]<=10) semGradesArray[i]='A';
            else if(semCgpaArray[i]>=7.5 && semCgpaArray[i]<9) semGradesArray[i]='B';
            else if(semCgpaArray[i]>=6 && semCgpaArray[i]<7.5) semGradesArray[i]='C';
            else if(semCgpaArray[i]>=4.5 && semCgpaArray[i]<6.0) semGradesArray[i]='D';
            else semGradesArray[i]='F';
        } 
        return semGradesArray;
    }


    static #finalCgpa(semCgpaArray){
        let sumOfCgpa=0;
        for(let i=0; i<semCgpaArray.length; i++)
        {
            sumOfCgpa+=semCgpaArray[i];
        }
        let averageOfCgpa = sumOfCgpa/semCgpaArray.length;
        return averageOfCgpa;
    }


    static #finalGrade(semCgpaArray){
        let sumOfCgpa=0, averageOfGrade, averageOfCgpa=0;
        for(let i=0; i<semCgpaArray.length; i++)
        {
            sumOfCgpa+=semCgpaArray[i];
        }
        averageOfCgpa = sumOfCgpa/semCgpaArray.length;
        if (averageOfCgpa>=9 && averageOfCgpa<=10) averageOfGrade='A';
            else if(averageOfCgpa>=7.5 && averageOfCgpa<9) averageOfGrade='B';
            else if(averageOfCgpa>=6 && averageOfCgpa<7.5) averageOfGrade='C';
            else if(averageOfCgpa>=4.5 && averageOfCgpa<6) averageOfGrade='D';
            else averageOfGrade='F';
        return averageOfGrade;
    }


    static createNewStudent(firstName, lastName, dateOfBirth, semCgpaArray, yearOfEnroll, yearOfPassing) {
        let fullName = firstName +" "+ lastName;
        let noOfYearsToGraduate = Student.#noOfYearsToGraduate(yearOfPassing,yearOfEnroll);
        let age = Student.#age(dateOfBirth);
        let finalCgpa = Student.#finalCgpa(semCgpaArray);
        let semGradesArr = Student.#semGradesArr(semCgpaArray);
        let finalGrade = Student.#finalGrade(semCgpaArray);
        let tempStudent = new Student(firstName, lastName, fullName, dateOfBirth, age, semCgpaArray, finalCgpa, semGradesArr, finalGrade, yearOfEnroll, yearOfPassing, noOfYearsToGraduate)
        return tempStudent
    }

    
    displayFullName() {
        console.log(`${firstName} ${lastName} `);
    }

    displayYearOfEnroll() {
        console.log(`${this.yearOfEnroll} `);
    }

    displayDateOfBirth() {
        console.log(`${this.dateOfBirth} `);
    }

    updateFirstname(newFirstname) {
        this.firstName = newFirstname;
        this.fullName = this.firstName +" "+ this.lastName;
    }

    updateLastName(newlastname) {
        this.lastName = newlastname;
        this.fullName = this.firstName +" "+ this.lastName;
    }

    updatesemCgpa(newsemCgpaArray) {
        this.semCgpaArray = newsemCgpaArray;
        this.semGradesArr = Student.#semGradesArr(newsemCgpaArray);
        this.finalCgpa = Student.#finalCgpa(newsemCgpaArray);
        this.finalGrade = Student.#finalGrade(newsemCgpaArray);
    }

    updateDOB(newdateOfBirth) {
        this.dateOfBirth = newdateOfBirth;
        this.age = Student.#age(newdateOfBirth);
    }
    
    updateYearOfEnroll(newYearOfEnroll) {
        this.yearOfEnroll = newYearOfEnroll;
        this.noOfYearsToGraduate = this.yearOfPassing - this.yearOfEnroll;
    }

    updateYearOfPassing(newYearOfPassing) {
        this.yearOfPassing = newYearOfPassing;
        this.noOfYearsToGraduate = this.yearOfPassing - this.yearOfEnroll;
    }

    update(propertyToUpdate, value) {
        switch (propertyToUpdate) {
            case "firstName": 
                this.updateFirstname(value)
                return `${propertyToUpdate} Updated with ${value}`

            case "lastName": 
                this.updateLastName(value)
                return `${propertyToUpdate} Updated with ${value}`

            case "semCgpaArray": 
                this.updatesemCgpa(value)
                return `${propertyToUpdate} Updated with ${value}`

            case "dateOfBirth": 
                this.updateDOB(value)
                return `${propertyToUpdate} Updated with ${value}`

            case "yearOfEnroll": 
                this.updateYearOfEnroll(value)
                return `${propertyToUpdate} Updated with ${value}`

            case "yearOfPassing": 
                this.updateYearOfPassing(value)
                return `${propertyToUpdate} Updated with ${value}`

            default: return "Wrong Property"

        }
    }
}
const ankit = Student.createNewStudent("Ankit", "Raj", "17 November 2000", [5,9,8.4,8.9,10]  , 2000, 2012)
console.log(ankit)
ankit.update("semCgpaArray",[9,9,9,9.1,8.9])
console.log(ankit)