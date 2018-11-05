"use strict"

class Person {
  constructor(id, firstName, lastName, email, phone, created) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName    
    this.email = email
    this.phone = phone
    this.created =  new Date(created)
    }
  }

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.filesToRead = this.readFile()
  }

  getFileName() {
    return this._file 
  }

  readFile() {
    const fs = require('fs')
    this.filesToRead = fs.readFileSync(this._file, 'utf8')
    this.filesToRead = this.filesToRead.split('\n')

    return this.filesToRead
  }

  getPeopleLength() {
    return this.filesToRead.length - 1
  }

  getPeople() {
    for (let i = 0; i < this.filesToRead.length; i++) {
      let arrString = this.filesToRead[i].split(",")
      let person = new Person(arrString[0], arrString[1],arrString[2], arrString[3], arrString[4], arrString[5])
      this._people.push(person)
    }

    console.log(this._people)
  }

  addPerson(person) {
    this._people.push(person)
  }

  saveFile() {
    const fs = require('fs')
    let csv = ""
    console.log(this._people)
    for (let i = 0; i < this._people.length; i++) {
      let word = ""

      for (let j in this._people[i]) {  
          word += this._people[i][j] + ","
      }

      word = word.substr(0, word.length - 1)
      csv += word + "\n"
    }

    fs.writeFileSync('people.csv', csv)
  }
}

let parser = new PersonParser('people.csv')
parser.getPeople()
parser.addPerson(new Person("201", "LOL", "hiragana", "arifin112@gmail.com", "34242424", new Date().toDateString()))
parser.saveFile()

console.log(`There are ${parser.getPeopleLength()} people in the file '${parser.getFileName()}'.`)
