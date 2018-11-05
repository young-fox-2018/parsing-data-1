"use strict"
let fs = require("fs")

class Person {
  constructor(id, firstname, lastname, email, phone, createat) {
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.phone = phone
    this.createat = new Date(createat)


  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readFile()
  }

  readFile() {
    let result = []
    const data = fs.readFileSync(this._file, 'utf8')
    let dataArr = data.split("\n")
    for (var i = 0; i < dataArr.length-1; i++) {
      let temp = dataArr[i].split(",")
      let person = new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5])
      result.push(person)
    }
    return result
  }

  get people() {

    return this._people
  }

  newpeople() {

  }

  addPerson(input) {
    parser.people.push(input)

  }

  save() {
    let dataStr = ""
    for (var i = 0; i < parser.people.length; i++) {
      dataStr = dataStr + `${parser.people[i].id},${parser.people[i].firstname},${parser.people[i].lastname},${parser.people[i].email},${parser.people[i].phone},${parser.people[i].createat}\n`
    }
    fs.writeFileSync(this._file, dataStr)
  }

}


let parser = new PersonParser('people.csv')
parser.addPerson(new Person(201, "Patria", "Gani", "patria.gani@gmail.com", "0852-5165-6109", "2018-05-10T03:53:40-07:00"))
parser.save()
console.log(parser.people);
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
