class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(id, firstName, lastName, email, phone) {
        this.id = id
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.phone = phone
        this.created_at = `${new Date()}`
    }
}

module.exports = Person