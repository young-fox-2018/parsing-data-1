"use strict"
const fs = require('fs')

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createdAt = createdAt    
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get file(){
    return this._file
  }

  get people() {
    return this._people
  }

  set people(param){
    this._people.push(param)
  }

  addPerson(id, firstName, lastName, email, phone, createdAt) {
    this.people = new Person (id, firstName, lastName, email, phone, createdAt)
  }

  addingData(callback){
    fs.readFile(this._file, 'utf8', (err, dataList) => {
      if(err) throw err
      else{
        dataList = dataList.split('\n')
        for(let i = 1; i < dataList.length; i++){
          let data = dataList[i].split(',')
          this.people = new Person (data[0], data[1], data[2], data[3], data[4], data[5])
        }
        callback()
      }
    })
  }

  save(){
    let output = `${Object.keys(this.people[0]).join(',')}\n`
    this.people.forEach((element) => {
      output += `${Object.values(element).join(',')}\n`
    })
    fs.writeFileSync('people.csv',output)
  }

}

let parser = new PersonParser('people.csv')
parser.addingData(() => {
  parser.addPerson(parser.people.length+1, 'John', 'Kosasih', 'kosasih@mail.com', '021-12345', new Date())
  parser.save()
  console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
})

