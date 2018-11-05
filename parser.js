"use strict"

const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.firs_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.readFile()
    this.getPeople()
  }

  get people() {
    return this._people
  }

  readFile () {
   this._peopleCSV = fs.readFileSync(this._file, 'utf8').split('\n')
  }

  getPeople () {
    for(let i = 1; i < this._peopleCSV.length; i++){
      let arrString = this._peopleCSV[i].split(',')
      let person = new Person (arrString[0], arrString[1], arrString[2], arrString[3], arrString[4], arrString[5])
      this._people.push(person)
    }
    return this._people
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
  }

  save () {
    let data = ''
    for(let i = 0; i < this.people.length; i++){
      data += Object.values(this.people[i]).join(',') + '\n'
    }
    fs.writeFileSync('newPeople.csv', data)
  }
}

let parser = new PersonParser('people.csv')

let person1 = new Person ('201', 'Arc', 'Clinton', 'xxx@gmail.com', '083807702018', 'yesterday')
let person2 = new Person ('202', 'the', 'Monalisa', 'monalisa@gmail.com', '083807703000', '300 years ago')
parser.addPerson(person1)
parser.addPerson(person2)
console.log(parser.people);
parser.save()

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

