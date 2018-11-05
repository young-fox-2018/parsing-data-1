"use strict"
let fs = require('fs')

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt) {
    this.id = id 
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get file() {
    return this._file  
  }
  
  get people() {
    return this._people
  }
  set people(input) {
    this._people.push(input)
  }

  readFile (callback) {
    let fs = require('fs')
    fs.readFile(this._file, 'utf8', (err,dataPerson) => {
      if (err) throw err
      else {
        dataPerson = dataPerson.split('\n')
        for (let i = 1; i < dataPerson.length; i++ ) {
          let data = dataPerson[i].split(',')
          let employee = new Person (data[0],data[1],data[2],data[3],data[4],data[5]) 
          this.people = employee  
        }
        callback(dataPerson)
      }
    })
  }
    
  addPerson(firstName,lastName,email,phone,createdAt) {
    let data = this.people
    let id = data.length+1
    let employee = new Person (id,firstName,lastName,email,phone,createdAt)
    this.people = employee
  }

  save() {
    let data = this.people
    let dataParser = `${Object.keys(data[0]).join(',')}\n`
    data.forEach((element) => {
      dataParser += `${Object.values(element).join(',')}\n`
    })
    fs.writeFileSync('people.csv',dataParser)
  }

}

let parser = new PersonParser('people.csv')

parser.readFile(()=> {
  parser.addPerson('John','Meyer','johnmeyer@email.com','22800-7892-009',new Date())
  parser.save()
  console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
})
