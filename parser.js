"use strict"
const fs = require('fs')
class Person {
  constructor(id, first_name, last_name, email, phone, created_at = new Date()) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readFile()
  }

  readFile() {
    let data = fs.readFileSync(this._file, 'utf8').split('\n')
    data.forEach((element, index) => {
      data[index] = data[index].split(',')
    });
    return data
  }

  get people() {
    console.log(this._people)
  }



  addPerson(input) {
    let data = ''
    data += `${input.id},${input.first_name},${input.last_name},${input.email},${input.phone},${input.created_at}`
    this._people.push(data)
  }
  
  save() {
    let data = ''
    this._people.forEach((element, index) => {
      data += this._people[index] + '\n'
    });
    //console.log(data)
    fs.writeFileSync(this._file, data)
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(201, 'Faishal', 'Amir', 'faishal@me.com', '0-123-4556'))
parser.save()

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
