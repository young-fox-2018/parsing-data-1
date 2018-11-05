"use strict"
// const Date = require("./Date.js")

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.email = email
    this.phone = phone
    this.createdAt = new Date(created_at) 
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.getPeople()
  }

  get people(){
    return this._people
  }

  readFile(){
  }
  
  //PUTTING THE PERSON NAME INTO OBJECT IN CLASS PERSON
  getPeople() {
    this._accessFile = fs.readFileSync(this._file, 'utf8').split("\n")
    
    let result = []
    
    for(let iPeople = 1 ; iPeople < this._accessFile.length ; iPeople++){
      let arrInfoSplit = this._accessFile[iPeople].split(",")
      let newPerson = new Person(arrInfoSplit[0], arrInfoSplit[1], arrInfoSplit[2], arrInfoSplit[3], arrInfoSplit[4], arrInfoSplit[5])
      result.push(newPerson)
    }
    return result
  }

  addPerson(info) {
    this._people.push(info)
    console.log('add success')
  }

  save(){
    let data = ""
    for(let i = 0 ; i < this.people.length ; i++){
      data += Object.values(this.people[i]).join(",") + "\n"
    }

    fs.writeFileSync("peopleNew.csv",data)
  }

}

module.exports = Person


let parser = new PersonParser('people.csv')

let newPerson = new Person("201", "Arnold", "Herod", "jail@jail.com", "+62855598888", "2018.19.356258.148645")

console.log(parser)

// console.log(parser.getPeople())
parser.addPerson(newPerson)
// console.log(parser.people)
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)