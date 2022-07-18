const ContactDetail = require("./contactDetail")
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

    createContactDetails(type,value){
        if(this.isActive==false){
            return [false,null]
        }
        const newcontactDetails = new ContactDetail(type, value)
        this.contactDetails.push(newcontactDetails)
        return [true , newcontactDetails]
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

module.exports = Contact;