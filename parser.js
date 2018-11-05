"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, created) {
    this.id = id 
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = new Date(created)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readFile()
  }

  readFile(){
    let result = []
    let data = fs.readFileSync(this._file, 'utf8').split('\n')
    // console.log(data)

    for(let i = 1; i < data.length-1; i++) {
      let temp = data[i].split(',')
      let tempData = new Person(temp[0], temp[1], temp[2], temp[3], temp[4], temp[5])
      result.push(tempData)
    }

    return result
  }

  get people () {
    return this._people
  }

  addPerson (newData) {
    this.people.push(newData)
  }

  save () {
    let result = 'id,first_name,last_name,email,phone,created_at' + '\n'
    let temp = this._people

    for(let i = 0; i < temp.length; i++) {
      result += `${temp[i].id},${temp[i].first_name},${temp[i].last_name},${temp[i].email},${temp[i].phone},${temp[i].created_at},\n`
    }

    fs.writeFileSync(this._file, result)
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person('200', 'atras', 'tudhi', 'atras.r@gmail.com', '666', new Date()))

console.log(parser)
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
