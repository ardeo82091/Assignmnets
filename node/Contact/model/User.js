const Contact = require('./contact.js');
const ContactDetail = require('./contactDetail.js');
const Credentials = require('./credential');
class User
{
    static userId = 100;
    static allUsers = [];
    constructor(firstName,lastName,credential,role)
    {
        this.UserId = User.userId++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.credential = credential;
        this.role = role;
        this.isActive = true;
        this.contacts = [];
    }

    static createAdmin()
    {
        const userName = "ankit";
        const password = "ankit@123";
        const firstName = "Ankit";
        const lastName = "Raj";
        const role = "admin";
        const [flag,message,newCredential] = Credentials.createCredential(userName,password);
        const admin = new User(firstName,lastName,newCredential,role)
        User.allUsers.push(admin);
        return [admin,"Admin created Successfully"];
    }

    createNewUser(firstname,lastName,userName, password, role)
    {
        if(this.isActive == false) return [null,"Not able to create an User"];
        if(this.role != "admin") return [null,"Please Specify the role to Admin to create a User"];
        let [indexOfUser,isuserNameexist] = User.findUser(userName)
        if(isuserNameexist){
            return [null,"Already Exists userName"]
        }
        const newCredential = new Credentials(userName,password);
        const newUser = new User(firstname,lastName,newCredential, role);
        User.allUsers.push(newUser);
        return [newUser,"New User created"];
    }

    static findUser(userName)
    {
        if(this.active == false) return [-1,false];
        for(let index=0; index<User.allUsers.length; index++)
        {
            if(User.allUsers[index].credential.userName == userName)
            return [index,true];
        }
        return [-2,false];
    }

    adminDeleteUser(userName)
    {
        if (this.isActive==false){
            return [false,"User not Exist"];
        }
        if(this.role != "admin") return[false,`Please specify the role to admin to delete ${fullName}`]
        let [indexOfUser, isUserExist] = User.findUser(userName);
        if(isUserExist == false)
        {
            return[false,"User not Exists, Please give the correct name."];
        }
        if(User.allUsers[indexOfUser].isActive == false) return[-1,"User already Deleted"];
        User.allUsers[indexOfUser].isActive = false;
        return [true,"successfully Deleted"];
    }

    createNewContact(firstName,lastName)
    {
        if(this.isActive == false) return [null, "User not found"];
        for(let index =0; index<this.contacts.length; index++)
        {
            if(this.contacts[index].firstName == firstName && this.contacts[index].lastName == lastName)
            return [null,"Name Already Existed, Please choose another Name "];
        }
        let newContact = new Contact(firstName,lastName);
        this.contacts.push(newContact);
        return [newContact,"Contact created Suceefully"];
    }

    indexOfContact(fullName)
    {
        if(this.contacts.length==0) return [-1,false]
        for(let indexofContact=0; indexofContact<this.contacts.length; indexofContact++)
        {
            if(this.contacts[indexofContact].isContactExist(fullName))
            return[indexofContact,true];
        }
        return [-1,false];
    }

    deleteUserContact(fullName)
    {
        if(this.isActive == false) return[false, "User not found"];
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) return [false, "User not found"];
        if(this.contacts[indexofContact].deleteContact()) 
        return[true,"Contact Deleted"];
        return [false,"Contact not exist"]
    }

    /**createContactDetail(fullName,type,value)
    {
        if(this.isActive == false) return [null ,false,"User is not active"];
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) return [null,false, "User not found"];

        let [isContactDetailsCreated,newContactDetail] = this.contacts[indexofContact].createContactDetails(type,value);
        if(isContactDetailsCreated== false)
        {
            return [null,false, "This contact is not Active"];
        }
        return [newContactDetail,true,"Contact Detail Added"];
    }**/

    getContact(fullName)
    {
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) 
        {
            return ([false, "User not found"]);
        }
        console.log(this.contacts[indexofContact].contactDetails);
    }
    
    updateFirstname(newFirstname) {
        this.firstName = newFirstname;
    }
    updateLastName(newlastname) {
        this.lastName = newlastname;
    }
    update(propertyToUpdate, value)
    {
        switch (propertyToUpdate) 
        {
            case "firstName": 
                this.updateFirstname(value)
                return true;

            case "lastName": 
                this.updateLastName(value)
                return true;
            
            default: return false;
        }
    }
}
module.exports = User;