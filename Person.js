class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(obj){
        this._id = obj.id,
        this._firstName = obj.firstName,
        this._lastName = obj.lastName,
        this._email = obj.email,
        this._phone = obj.phone,
        this._created_at = new Date(obj.created)
    }
}

module.exports = Person;