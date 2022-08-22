const ContactDetail = require("./contactDetail")
const uuid = require("uuid");
class Contact
{
    constructor(firstName,lastName,fullName)
    {
        this.contactId = uuid.v4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.isContactActive = true;
        this.contactDetails = [];
    }

    createContactDetails(type,value){
        if(this.isContactActive==false){
            return [false,"Contact not found"]
        }
        for(let index=0; index<this.contactDetails.length; index++)
        {
            if(this.contactDetails[index].type == type) 
            {
                return [false,"type already exist"];
            }
        }
        const newcontactDetails = new ContactDetail(type, value)
        this.contactDetails.push(newcontactDetails)
        return [true , "ContactDetail is created"]
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

module.exports = Contact;