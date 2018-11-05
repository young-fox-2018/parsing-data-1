"use strict"

const fs = require("fs")

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this._id = id,
    this._first_name = first_name,
    this._last_name = last_name,
    this._email = email,
    this._phone = phone,
    this._created_at = created_at
  }
}

class PersonParser {
  
  constructor(file) {
    this._file = file
    this._people = this.assignPeople() // isinya array of object
  }  

  readFile() {
      return fs.readFileSync("people.csv", "utf-8")
  }

  assignPeople() {
    const data = this.readFile()

    let output = []
    let people = data.split("\n") 
    let current = null
    
    for (let i = 1; i < people.length; i++) {
      current = people[i].split(",")
      let person = new Person(Number(current[0]), current[1], current[2],current[3], current[4], new Date(current[5]))
      output.push(person)
    }
    return output
  }

  get people() {
    return this._people
  }
  get file() {
    return this._file
  }

  addPerson(id, first_name, last_name, email, phone) {
      let person = new Person(id, first_name, last_name, email, phone, new Date())
      this.people.push(person)
   }

   save() {
      
      let output = ""
      for (let i = 0; i < this.people.length; i++) {
          output += `${this.people[i]._id},${this.people[i]._first_name},${this.people[i]._last_name},${this.people[i]._email},${this.people[i]._phone},${this.people[i]._created_at}\n` 
      }
      fs.writeFileSync("people2.csv", output)
      console.log("File has been saved!")
   }
}


let parser = new PersonParser('people.csv')

parser.addPerson(201, "Ruben", "Onya", "rubeben@gmail.com", "567829162")
//console.log(parser.people)
//console.log(parser._people[parser._people.length-1])
//parser.save()


//console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
