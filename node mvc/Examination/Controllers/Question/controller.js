const JWTPayload = require('../../view/authentication');
const Question = require('../../view/question');
const Tests = require('../../view/test');
const User = require('../../view/user');

function CreateQuestion(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const {tech,details,options,correctAnswer,complexity} = req.body;

    console.log(options.length)
    var ans=false;
    for(let index=0; index<options.length; index++)
    {
        if(options[index]==correctAnswer){
            ans = true;
        }
    }
    if(ans!=true)
    {
        resp.status(406).send("Correct Answer is not in the options");
        return;
    }
    
    if (typeof tech != "string") {
        resp.status(406).send("tech is invalid");
        return;
    }

    if (typeof details != "string") {
        resp.status(406).send("details is invalid");
        return;
    }    
    
    if (typeof correctAnswer != "string") {
        resp.status(406).send("correctAnswer is invalid");
        return;
    }

    if (typeof complexity != "number") {
        resp.status(406).send("complexity is invalid");
        return;
    }

    if (typeof options != "object") {
        resp.status(406).send("options is invalid");
        return;
    }
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
    resp.status(201).send(newQuestion);
    return;
}

function AttemptTest(req,resp)
{
    const {userName,tech} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "user")
    {
        resp.status(401).send("Login with User")
        return;
    }
    if(newPayload.userName != userName )
    {
        resp.status(401).send("please specify the correct UserName")
        return;
    }
    
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not Exist");
        return;
    }
    let [isTechExist,UserIndexOfTech,messi] = User.allUsers[index].isUserTech(tech);
    if(!isTechExist)
    {
        resp.status(403).send(messi);
        return;
    }
    let [isAttempted,mess]= User.allUsers[index].test[UserIndexOfTech].isTestAttempted();
    if(isAttempted == true)
    {
        resp.status(403).send(mess);
        return;
    }

    resp.status(201).send(User.allUsers[index].test[UserIndexOfTech].question);
    return;
}

function TakeTest(req,resp)
{
    const userName = req.params.userName;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "user")
    {
        resp.status(401).send("Login with User")
        return;
    }
    if(newPayload.userName != userName )
    {
        resp.status(401).send("please specify the correct UserName")
        return;
    }
    
    let [index,isUserExist] = User.findUser(userName);
    if(!isUserExist)
    {
        resp.status(403).send("User not Exist");
        return;
    }
    resp.status(201).send(User.allUsers[index].test);
    return;

}

module.exports = {CreateQuestion,AttemptTest,TakeTest}