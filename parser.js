"use strict"
const fs = require("fs")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
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
    this._people = []
  }

//   getData(){
//     this.dataCSV = fs.readFileSync(this._file,'utf8')
//     return this.dataCSV
//   }

  get file(){
    return this._file
  }

  get people() {
    return this._people
  }


  readPeople(){
    // let people = this.people
    let arrDataCSV = fs.readFileSync(this._file,'utf8').split("\n")
    // let arrDataSCV = this.getData().split("\n")
  
    for(let i = 1; i < arrDataCSV.length; i++){
      let content = arrDataCSV[i].split(",")
      
      let id = content[0]
      let first_name = content[1]
      let last_name = content[2]
      let email = content[3]
      let phone = content[4]
      let created_at = new Date(content[5])

      let person = new Person(id, first_name, last_name, email, phone, created_at)
      this._people.push(person)
    }
    return this._people
  }

  addPerson(objAddPerson) {
    this._people.push(objAddPerson)
  }

  save(){
        // let data = "id,first_name,last_name,email,phone,created_at\n"
        let data = ""

        for(let i = 0; i < this._people.length; i++){
            let person = this._people[i]
            let objToArray = [person.id, person.first_name, person.last_name, person.email, person.phone, person.created_at]
            let arrToString = objToArray.join(",")
            data += (arrToString+"\n")
        }

        fs.writeFileSync("people.csv",data,"utf-8")
        // return this
    }

}

let parser = new PersonParser('people.csv')
console.log(parser.readPeople())

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.addPerson(new Person("201,Anhar,Fathoni,et@nibhsit.com,1-174-288-4996,2013-06-19T12:55:10-07:00"))
// parser.addPerson(new Person("202,A,B,abc@gmail.com,1-702-580-4785,2012-05-13T21:05:15-07:00"))
parser.save()