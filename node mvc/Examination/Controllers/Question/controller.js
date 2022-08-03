const JWTPayload = require('../../view/authentication');
const Question = require('../../view/question');
const Tests = require('../../view/test');
const User = require('../../view/user');

function CreateQuestion(req,resp)
{
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
}

function AttemptTest(req,resp)
{
    const {userName,tech} = req.params;
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

    resp.status(201).send(User.allUsers[index].test[UserIndexOfTech].question)

}

module.exports = {CreateQuestion,AttemptTest}