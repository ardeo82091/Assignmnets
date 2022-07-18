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

module.exports = ContactDetail;