const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
app.use(cors())
app.use(bodyParser.json())
//class Addition{
 //   constructor(number1,number2,sum)
//    {
  //      this.number1 = number1
  //      this.number2 = number2
  //      this.sum = sum
  //  }
//}
   // app.post("/api/v1/addition",(req,resp)=>{
        //const {number1,number2} = req.body
    //    const num1 = req.body.num1
     //   const num2 = req.body.num2
     //   console.log("I m here with ${num1} and ${num2}")
     //   const sum = num1+num2;
      //  const newAddition = new Addition(num1,num2,sum);
     //   console.log(newAddition)
      //  resp.status(200).send(newAddition)
    //})

    //const {User} = require("./model/User");
    //app.post("/api/v1/user",(req,resp)=>{
     //   const fname = req.body.firstname;
     //   const lname = req.body.lastname;
     //   const age = req.body.age;
    //   const newUser = new User(fname,lname,age);
    //    User.allUser.push(newUser);
   //    console.log(newUser);
    // resp.status(201).send(newUser)
 // })
   // app.listen(8080,()=>{
    //console.log("app has started at port 8080")
    //})
    const {Student} = require("./model/Student.js");


    app.post("/api/v1/user1",(req,resp)=>{
      const propertyToUpdate= req.body.propertyToUpdate;
      const value = req.body.value;
      const id = req.body.id;
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
      resp.status(200).send(newStudent)
  })
    app.listen(8084,()=>{
      console.log("app has started at port 8084")
    })


    

    app.post("/api/v1/user/user1",(req,resp)=>{
      let firstName = req.body.firstname;
      let lastname  = req.body.lastname;
      let dateOfBirth = req.body.dateOfBirth;
      let semCgpaArray = req.body.semCgpaArray;
      let yearOfEnroll = req.body.yearOfEnroll;
      let yearOfPassing = req.body.yearOfPassing;

      const newStudent = Student.createNewStudent(firstName,lastname,dateOfBirth,semCgpaArray,yearOfEnroll,yearOfPassing);
      Student.allStudents.push(newStudent);
      resp.status(201).send(Student.allStudents)
  })
    app.listen(8080,()=>{
      console.log("app has started at port 8080")
    })


    app.post("/api/v1/user2:id",(req,resp)=>{
      let firstName = req.body.firstname;
      let lastname  = req.body.lastname;
      let dateOfBirth = req.body.dateOfBirth;
      let semCgpaArray = req.body.semCgpaArray;
      let yearOfEnroll = req.body.yearOfEnroll;
      let yearOfPassing = req.body.yearOfPassing;

      const newStudent = Student.createNewStudent(firstName,lastname,dateOfBirth,semCgpaArray,yearOfEnroll,yearOfPassing);
      Student.allStudents.push(newStudent);
      resp.status(200).send(Student.allStudents)
  })
    app.listen(8081,()=>{
      console.log("app has started at port 8081")
    })