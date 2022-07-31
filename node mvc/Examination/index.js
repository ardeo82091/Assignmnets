const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const User = require('./view/user');
const Question = require('./view/question');
const Tests = require('./view/test');
const JWTPayload = require('./view/authentication');

let [admin,message] = [null,"Already exist"];
async function createAdmin()
{
    [admin,message] = await User.createAdmin("Ankit","Raj",20,"India","react","java","sql","ardeo","Papa@luv");
    return;
}

app.post("/api/v1/login/:userName", async (req,resp)=>{
    const userName = req.params.userName;
    const password = req.body.password;
    let [indexOfUser,isUserExist] = User.findUser(userName);
    if(isUserExist == false)
    {
        resp.status(504).send("No user Exists with this userName")
        return;
    }
    let isPasswordMatch = await User.allUsers[indexOfUser].comparePassword(password);
    if(isPasswordMatch == false)
    {
        resp.status(504).send("Invalid Credentials")
        return;
    }
    const newPayload = new JWTPayload(User.allUsers[indexOfUser]);
    const newToken = newPayload.createToken();
    resp.cookie("mytoken",newToken)
    //,{
    //    expires:new Date(Date.now()+1*100000)
    //}
    resp.status(200).send("Loggin Done");
})

app.post('/api/v1/MakeTest',(req,resp)=>{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    const tech = req.body.tech;
    let [indexoFTech,istechExist] = Tests.findIndexOfTech(tech);
    if(istechExist) {
       resp.status(201).send(Tests.allTest[indexoFTech].question); 
       return;
    }
    
    const newTest = new Tests(tech);
    Tests.allTest.push(newTest);
    // let [indeix,istechExiste] = Tests.findIndexOfTech(tech);
    // for(let index=0; index<Question.allQuestions.length; index++)
    // {
    //     Tests.allTest[indeix].insertQuestions(Question.allQuestions[index]);
    // }
    // resp.status(201).send(Tests.allTest[indeix].question);
    resp.status(201).send("Test Of Tech Created Successfully,Now please add some questions");
    return;
})

app.post('/api/v1/createQuestion',(req,resp)=>{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    const {tech,details,options,correctAnswer,complexity} = req.body;
    let newQuestion = new Question(tech,details,options,correctAnswer,complexity);
    
    let [index,istechExist] = Tests.findIndexOfTech(tech);
    if(!istechExist)
    {
        const newTest = new Tests(tech);
        Tests.allTest.push(newTest);
        index = Tests.allTest.length - 1;
    } 
    Tests.allTest[index].insertQuestions(newQuestion);
   // Question.allQuestions.push(newQuestion);
    resp.status(200).send(newQuestion);
    return;
})

app.post('/api/v1/createUser', async (req,resp)=>{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    const {firstName,lastName,exper,country,frontend,backend,dataBase,userName,password} = req.body;
    let [isUserCreated,message] = await admin.createNewUser(firstName,lastName,exper,country,frontend,backend,dataBase,userName,password);
    if(isUserCreated == null)
    {
        resp.status(504).send(message);
        return;
    }
    resp.status(201).send(isUserCreated);
    return ;
})

app.get('/api/v1/getAllUser',(req,resp)=>{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(504).send("please specify this role to admin")
        return;
    }
    resp.status(201).send(User.allUsers);
    return;
})

app.post('/api/v1/attemptTest/:userName/:questionId',(req,resp)=>{
    const {userName,questionId} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "user")
    {
        resp.status(504).send("Login with User")
        return;
    }
    if(newPayload.userName != userName )
    {
        resp.status(504).send("please specify the correct UserName")
        return;
    }
    const {tech,selectedOption} = req.body;
    
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
        return;
    }
    let [isTechExist,UserIndexOfTech,messi] = User.allUsers[index].isUserTech(tech);
    if(!isTechExist)
    {
        resp.status(504).send(messi);
        return;
    }
    let [isAttempted,mess]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
    if(isAttempted == true)
    {
        resp.status(504).send(mess);
        return;
    }
    let [isQuestionEixst,indexOfQuestion] = User.allUsers[index].test[UserIndexOfTech].isUserQuestionIdexist(questionId);
    if(!isQuestionEixst)
    {
        resp.status(504).send("Question not find");
        return;
    }
    let [isCorrectAnswer,info,marks] = User.allUsers[index].test[UserIndexOfTech].question[indexOfQuestion].isCorrectAnswer(selectedOption);
    
    if(!isCorrectAnswer)
    {
        User.allUsers[index].test[UserIndexOfTech].updateTestScore(false,marks);
        User.allUsers[index].updateUserScore();
        User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
        resp.status(504).send(info);
        return;
    }
    User.allUsers[index].test[UserIndexOfTech].updateTestScore(true,marks);
    User.allUsers[index].updateUserScore();
    User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
    resp.status(504).send(info);
    return;

})

app.get('/api/v1/ScoreOfTech/:userName/:tech',(req,resp)=>{
    const {userName,tech} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(504).send("please Login with correct Id")
            return;
        }
        let [index,isUserExist] = User.findUser(userName);
        if(!isUserExist)
        {
            resp.status(504).send("User not Exist");
            return;
        }
        let [isTechExist,UserIndexOfTech,messi] = User.allUsers[index].isUserTech(tech);
        if(!isTechExist)
        {
            resp.status(504).send(messi);
            return;
        }
        let [isAttempted,mess]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
        if(!isAttempted)
        {
            resp.status(504).send(mess);
            return;
        }
        let testScore = User.allUsers[index].test[UserIndexOfTech].score;
        let outOfScore = User.allUsers[index].test[UserIndexOfTech].outOffScore;
        resp.status(201).send(`${userName} scored ${testScore} out off ${outOfScore} in ${tech} technology`);
        return;
    }
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
        return;
    }
    let [isTechExist,UserIndexOfTech,messi] = User.allUsers[index].isUserTech(tech);
    if(!isTechExist)
    {
        resp.status(504).send(messi);
        return;
    }
    let [isAttempted,mess]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
    if(!isAttempted)
    {
        resp.status(504).send(mess);
        return;
    }
    let testScore = User.allUsers[index].test[UserIndexOfTech].score;
    let outOfScore = User.allUsers[index].test[UserIndexOfTech].outOffScore;
    resp.status(201).send(`${userName} scored ${testScore} out off ${outOfScore} in ${tech} technology`);
    return;
})

app.get('/api/v1/ScoreOfUser/:userName',(req,resp)=>{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(504).send("please Login with correct Id")
            return;
        }
        let [index,isUserExist] = User.findUser(userName);
        if(!isUserExist)
        {
            resp.status(504).send("User not Exist");
            return;
        }
        let [isAttempted,mess]= User.allUsers[index].allTestAttempted();
        if(!isAttempted)
        {
            resp.status(504).send(mess);
            return;
        }
        let testScore = User.allUsers[index].totalTestScore;
        let outOfScore = User.allUsers[index].outOffScore;
        resp.status(201).send(`Total score score by ${userName} is ${testScore} out off ${outOfScore}`);
        return;
    }
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(504).send("User not Exist");
        return;
    }
    let [isAttempted,mess]= User.allUsers[index].allTestAttempted();
    if(!isAttempted)
    {
        resp.status(504).send(mess);
        return;
    }
    let testScore = User.allUsers[index].totalTestScore;
    let outOfScore = User.allUsers[index].outOffScore;
    resp.status(201).send(`Total score score by ${userName} is ${testScore} out off ${outOfScore}`);
    return;
})

app.post("/api/v1/logout",(req,resp)=>{
    resp.cookie("mytoken",'none',{
        expires: new Date(Date.now()+ 0*1000),
    })
    resp.status(200).send("User Logged out Successfully");
})

app.listen(8082,(req,resp)=>{
    createAdmin();
 console.log("started");
})