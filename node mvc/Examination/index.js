const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const {login,validAdmin,validUser} = require('./Controllers/Login/controller');
const logout = require('./Controllers/Logout/controller');
const { UserTotalScore, CreateUser, AllUser, NumberOfUser, createAdmin, UpdateUser, deleteUser} = require('./Controllers/User/controller');
const { AllTest, NOTest, TechScore ,SubmitTest} = require('./Controllers/Test/controller');
const { CreateQuestion, AttemptTest ,TakeTest} = require('./Controllers/Question/controller');

app.post("/api/v1/login", async (req,resp)=> login(req,resp));

app.post('/api/v1/createQuestion',(req,resp)=> CreateQuestion(req,resp));

app.post('/api/v1/getTest',(req,resp)=> AllTest(req,resp));

app.get('/api/v1/numberOfTest',(req,resp)=> NOTest(req,resp));

app.post('/api/v1/createUser', async (req,resp)=>CreateUser(req,resp));

app.get('/api/v1/numberOfUser',(req,resp)=> NumberOfUser(req,resp));

app.post('/api/v1/getAllUser',(req,resp)=> AllUser(req,resp));

app.put('/api/v1/updateUser',(req,resp)=> UpdateUser(req,resp));

app.post("/api/v1/deleteUser", (req, resp) => deleteUser(req, resp));

app.post('/api/v1/attemptTest/:userName/:tech',(req,resp)=>AttemptTest(req,resp));

app.post("/api/v1/taketest/:userName",  (req,resp)=> TakeTest(req,resp));

app.post('/api/v1/submitTest/:userName/:tech', (req,resp)=> SubmitTest(req,resp));

app.get('/api/v1/ScoreOfTech/:userName/:tech',(req,resp)=>TechScore(req,resp))

app.get('/api/v1/ScoreOfUser/:userName',(req,resp)=> UserTotalScore(req,resp));

app.post("/api/v1/isAdminLogin",(req,resp)=>validAdmin(req,resp));

app.post("/api/v1/isUserLogin/:userName",(req,resp)=>validUser(req,resp));

app.post("/api/v1/logout",(req,resp)=>logout(req,resp));

app.listen(8082,(req,resp)=>{
    createAdmin();
 console.log("started");
})