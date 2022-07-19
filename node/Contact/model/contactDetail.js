class ContactDetail
{
    static contactDetailId =0;
    constructor(type, value)
    {
        this.contactDetailId = uuid.v4();
        this.type = type;
        this.value = value;
    }
}

module.exports = ContactDetail;