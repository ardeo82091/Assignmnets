const uuid = require('uuid');
class User
{
    static allUser = [];
    constructor(fname,lname,age)
    {
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.id = uuid.v4();
    }
}
module.exports = {User};