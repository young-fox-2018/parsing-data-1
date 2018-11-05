"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = this.convertDate(created_at)
  }
  convertDate(date) {
    return Date(date)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._isiFile = []
    this._people = []
    this.readFile()
  }
  
  // hanya me return hasil dari people 
  get people() {
    return this._people
  }
  
  // convert kedalam bentuk array 
  readFile() {
    this._isiFile = fs.readFileSync(this._file,'utf8').split("\n")
    this.convertObject()
    // console.log(this._isiFile)
  }
  
  // convert dari array ke object 
  convertObject() {
    //split isi tiaparray
    let newArr = []
    for (let i = 0; i < this._isiFile.length; i++) {
     newArr.push(this._isiFile[i].split(','));
    }
    for (let i = 1; i < newArr.length; i++) {
      let obj = new Person(newArr[i][0], newArr[i][1], newArr[i][2], newArr[i][3], newArr[i][4], newArr[i][5])
      this._people.push(obj)
    }
    // console.log(this._people)
  }

  addPerson(obj) {
    this._people.push(obj)
    // console.log(this._people)
    return this
  }

  convertString (people) {
    let stringResult = "id,first_name,last_name,email,phone,created_at\n"
    for (let i = 0; i < people.length; i++) {
      let tempArr = []
      let tmpStr =""
      tempArr.push(people[i].id,people[i].first_name,people[i].last_name,people[i].email,people[i].phone,Date(people[i].created_at))
      tmpStr= tempArr.join(',')
      if(i === people.length-1) {
        stringResult += tmpStr
      }else {
        tmpStr += '\n'
        stringResult += tmpStr
      }
      // console.log(tmpStr)
    }
    // console.log(stringResult)
    return stringResult
  }

  save(){
    let data = this.convertString(this._people)
    // write
    fs.writeFileSync('people.csv',data,'utf8')
    return this
  }

}


let parser = new PersonParser('./people.csv')
// console.log(parser.people)
console.log(parser.addPerson(new Person('201','Abed','Lubis','lubisabednego@gmail','081263264401','2018-10-26T02:13:03-07:00')).save().people)
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
