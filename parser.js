"use strict"
let fs = require('fs')
let data = fs.readFileSync('people.csv', 'utf8').split('\n')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, date) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.date = date
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parseFile()
  }

  parseFile() {
    let temp = []
    for (let i = 1; i < data.length; i++) {
      let arr = data[i].split(",")
      temp.push(new Person(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]))
    }
    return temp
  }

  get people() {
    return this._people
  }
  get size(){
    return this.people.length
  }
  get file(){
    return this._file
  }

  addPerson(input) {
    this._people.push(input)
  }

  save() {
    let value = ''
    for(let i = 0; i < this.people.length; i++){
      let obj = Object.values(this._people[i])
      value += obj.join(',')+'\n'
    }
    fs.writeFileSync('people.csv',value)
    return value
  }
}

let parser = new PersonParser('people.csv')
parser.people
parser.parseFile()
parser.addPerson(new Person(101, 'Picky', 'Sarah', 'email@siapaya', '08123456789', new Date().toISOString()))
parser.addPerson(new Person(102, 'Watery', 'Mouth', 'email@apaya', '08987654321', new Date().toISOString()))
parser.save(this._people)
console.log(parser.people)
console.log(parser.save())
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)