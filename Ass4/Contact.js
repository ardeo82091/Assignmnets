class User
{
    static userId = 100;
    static allUsers = [];
    constructor(firstName,lastName,username,role)
    {
        this.UserId = User.userId++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.role = role;
        this.isActive = true;
        this.contacts = [];
    }

    createNewUser(firstname,lastName,username, role)
    {
        if(this.role != "admin")
        return [-1,"Please Specify the role to Admin to create a User"]
        let [indexOfUser,isUsernameexist] = User.#findUser(username)
        if(isUsernameexist){
            console.log("Username already exists");
            return [-1,"Already Exists Username"]
        }
        let newUser = new User(firstname,lastName,username, role);
        User.allUsers.push(newUser);
        return [newUser,"New User created"];
    }

    static #findUser(username)
    {
        for(let index=0; index<User.allUsers.length; index++)
        {
            let user = User.allUsers; 
            if(user[index].username = username)
            return [index,true];
        }
        return [-1,false];
    }

    adminDeleteUser(username)
    {
        if (this.isActive==false){
            return [-1,"user not Exist"];
        }
        if(this.role != "admin") return[this.role,`Please specify the role to admin to delete ${fullName}`]
        let [indexOfUser, isUserExist] = User.#findUser(username);
        if(isUserExist == false)
        {
            return[-1,"User not Exists, Please give the correct name."];
        }
        if(User.allUsers[indexOfUser].isActive == false) return[-1,"User already Deleted"];
        User.allUsers[indexOfUser].isActive = false;
    }

    createNewContact(firstName,lastName)
    {
        if(this.isActive == false) return [false, "User not found"];
        let newContact = new Contact(firstName,lastName);
        this.contacts.push(newContact);
        return newContact;
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

    deleteUserContact(firstName,lastName)
    {
        if(this.isActive == false) return[false, "User not found"];
        let [indexofContact,iscontactexist] = this.indexOfContact(`${firstName} ${lastName}`);
        if(iscontactexist == false) return [false, "User not found"];
        if(this.contacts[indexofContact].deleteContact()) return[this.contacts[indexofContact],"Contact Deleted"];
        return [nil,"Contact not exist"]

    }

    addContactDetail(firstName,lastName,type,value)
    {
        if(this.isActive == false) return [false, "User is not active"];
        let [indexofContact,iscontactexist] = this.indexOfContact(`${firstName} ${lastName}`);
        if(iscontactexist == false) return [false, "User not found"];

        let newContactDetail = new ContactDetail(type,value);
        this.contacts[indexofContact].contactDetails.push(newContactDetail);
        return[newContactDetail,"Contact Detail Added"];
    }

    getContact(fullName)
    {
        let [indexofContact,iscontactexist] = this.indexOfContact(fullName);
        if(iscontactexist == false) 
        {
            return ([false, "User not found"]);
        }
        console.log(this.contacts[indexofContact].contactDetails);
    }
}

class Contact
{
    static contactID =1000;
    constructor(firstName,lastName)
    {
        this.contactId = Contact.contactID++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isContactActive = true;
        this.contactDetails = [];
    }

    isContactExist(fullName)
    {
        if(this.isContactActive == false) return false;
        if(`${this.firstName} ${this.lastName}` == fullName)  return true;
    }

    deleteContact()
    {
        if(this.isContactActive == false) return [false,"Contact not found"];
        this.isContactActive = false;
        return[true,"Delete contact"];
    }
}

class ContactDetail
{
    static contactDetailId =0;
    constructor(type, value)
    {
        this.contactDetailId = ContactDetail.contactDetailId++;
        this.type = type;
        this.value = value;
    }
}

const ankit = new User("Ankit","Raj","ankit","admin");
console.log(ankit);
let [abhishek, Information] = ankit.createNewUser("Abhishek","Singh","abhishek","user");
console.log(abhishek);
console.log(ankit);
abhishek.createNewContact("Aarohi","Kashyap");
abhishek.createNewContact("Divya","Patle");
console.log(abhishek);

abhishek.addContactDetail("Divya","Patle","email","divyapatle@123");
abhishek.addContactDetail("Arohi","Kashyap","email","aarohie@123");
abhishek.addContactDetail("Aarohi","Kashyap","email","aarohikashyape@123");

abhishek.getContact("Divya Patle");
abhishek.getContact("Aarohi kashyap");
abhishek.getContact("Aarohi Kashyap");
abhishek.deleteUserContact("Aarohi","Kashyap");
abhishek.getContact("Aarohi Kashyap");

ankit.adminDeleteUser("Abhishek Singh");
console.log(abhishek)
let [abhi,message] = ankit.createNewUser("Raj","Singh", "abhishek", "user");