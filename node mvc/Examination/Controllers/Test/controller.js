const JWTPayload = require('../../view/authentication');
const Question = require('../../view/question');
const Tests = require('../../view/test');
const User = require('../../view/user');

function AllTest(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    const { limit, pageNumber } = req.body;
    let startIndex = (pageNumber - 1) * limit;
    let endIndex = pageNumber * limit;
    resp.status(201).send(Tests.allTest.slice(startIndex,endIndex)); 
    return;

}

function NOTest(req,resp)
{
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        resp.status(401).send("please specify this role to admin")
        return;
    }
    resp.status(201).send(Tests.allTest.length.toString()); 
    return;

}

function TechScore(req,resp)
{
    const {userName,tech} = req.params;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "admin")
    {
        if(newPayload.userName != userName)
        {
            resp.status(401).send("please Login with correct Id")
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
        if(!isAttempted)
        {
            resp.status(403).send(mess);
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
    if(!isAttempted)
    {
        resp.status(403).send(mess);
        return;
    }
    let testScore = User.allUsers[index].test[UserIndexOfTech].score;
    let outOfScore = User.allUsers[index].test[UserIndexOfTech].outOffScore;
    resp.status(201).send(`${userName} scored ${testScore} out off ${outOfScore} in ${tech} technology`);
    return;
}

function SubmitTest(req,resp)
{
    const {userName,tech} = req.params;
    const answers = req.body.answers;
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "user")
    {
        resp.status(401).send("Login with User")
        return;
    }
    if(newPayload.userName != userName )
    {
        resp.status(401).send("please Login with your UserName")
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
    const user = User.allUsers[index].test[UserIndexOfTech];
    if(user.question.length == 0)
    {
        user.isAttempted = true;
        user.score = 0;
        user.outOffScore = 0;
        resp.status(403).send("Test have not any question");
        return;
    }
    User.allUsers[index].test[UserIndexOfTech].updateUser(answers);
    User.allUsers[index].test[UserIndexOfTech].updateTestScore();
    User.allUsers[index].test[UserIndexOfTech].testAttempted();
    User.allUsers[index].updateUserScore();
    resp.status(201).send("Test is submitted");
    return;
}

module.exports = {AllTest,NOTest, TechScore,SubmitTest}