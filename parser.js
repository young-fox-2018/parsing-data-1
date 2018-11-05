"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this.id= id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.email = email,
    this.phone = phone,
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.generatePeople()
    // this.readFile()
  }

  readFile() {
    return fs.readFileSync(this._file, 'utf8').split('\n')
  }

  generatePeople () {
    let result = []
    let temp = this.readFile().slice(1)

    for ( let i = 0; i < temp.length; i++) {
      let splitted = temp[i].split(',')
      result.push(new Person(splitted[0],splitted[1],splitted[2],splitted[3],splitted[4], splitted[5]))
      }

    return result
  }

  get people() {
    return {
      size: this._people.length
    }
  }

  get file () {
    return this._file
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    // console.log(new Date())
    // console.log(new Person(id, first_name, last_name, email, phone, created_at))
    this._people.push(new Person(id, first_name, last_name, email, phone, created_at))
    // console.log(arguments)
  }

  save() {
    let temp = this._people
    let header = []
    
    let result = []

    for ( let key in temp[0]) {
      header.push(key)
    }
    result.push(header.join(','))
    
    for ( let i = 0; i < temp.length; i++) {
      let tempPeople = []
      for ( let key in temp[0]) {
        tempPeople.push(temp[i][key])
      }
      result.push(tempPeople.join(','))
    }
    
    result = result.join('\n')

    fs.writeFileSync('peopleDummy.csv', result, 'utf8')

  }
}

let peopleCSV = fs.readFileSync('people.csv', 'utf8')


// console.log(peopleCSV)
let parser = new PersonParser('people.csv')

// console.log(parser.people)
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// console.log(person.getPeople())

parser.addPerson(212, 'rangga', 'kusuma', 'ranggavskusuma@gmail.com', '080808080808', new Date())

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)


parser.save()

let person = new Person (212, 'rangga', 'kusuma', 'ranggavskusuma@gmail.com', '080808080808', new Date())

// console.log(person.id)

// fs.writeFileSync('peopleDummy.csv', [1,2,3,4], 'utf8')
// console.log(parser._people)

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
