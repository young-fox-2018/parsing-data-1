"use strict"

class Person{
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this._file = file.split('\n').slice(1)
    this._people = []
    this._header = file.split('\n')[0].split(',')
    this._generateJSON = this.generatePeople()
  }

  getPeople() {
    return this.people
  }

  addPerson(data) {
    this._people.push(
      data
    )
    return this._people
  }

  generatePeople() {
    let result = []
    for (let i = 0; i < this._file.length; i++) {
      let arr = this._file[i].split(',')
      
      for (let j = 0; j < arr.length; j++) {
        this._people[i] = new Person(
          arr[0],
          arr[1],
          arr[2],
          arr[3],
          arr[4],
          new Date(arr[5]))
      }
    }
    return this._people
  }

  save() {
    let result = 'id,first_name,last_name,email,phone,created_at'+'\n'
    
    for (let i = 0; i < this._people.length; i++) {
      result += 
      this._people[i].id + ','+
      this._people[i].first_name +','+
      this._people[i].last_name +','+
      this._people[i].email +','+
      this._people[i].phone +','+
      this._people[i].created_at +','+'\n'
      
    }
    fs.writeFileSync(
      'people.csv',result
    )
    console.log(this._people[0]);
    
  }
}

const fs = require('fs')
let dataCSV = fs.readFileSync('people.csv','utf8')

let parser = new PersonParser(dataCSV)

console.log(
  parser.addPerson(
    new Person(
      9,"Taqi","Aziz", "taqi@taqi.com","087782387703",new Date()
    )
  )
);


parser.save()





// console.log(parser.addPerson(
//   "10",
//   "Muhammad Taqi",
//   "Abdul Aziz",
//   "taqi_sting@hotmail.com",
//   "087782387703",
//   "2012-02-29T23:34:35-08:00"));


// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
