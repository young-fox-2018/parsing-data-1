"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(file) {
    // this.file = file.split(',')
    this.id = file[0]
    this.first_name = file[1]
    this.last_name = file[2]
    this.email = file[3]
    this.phone = file[4]
    this.created_at = new Date(file[5])
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    // array of oobject 
    // trim buat ngilangin spasi"
    this.file2 = fs.readFileSync(file, 'utf8').trim().split('\n')
    this._people = []
    this.str;
  }

  get people() {
    return this._people
  }

  addPerson(data) {
    // this.str = data.join(',')
    this._people.push(data)
  }

  buatList() {
    for (let i = 1; i < this.file2.length; i++) {
      let info = new Person(this.file2[i].split(','))
      this._people.push(info)
    }
    return this
  }

  save() {
    let file = this.file2[0]
   // // console.log(file)
   var str = file
   for(var i = 0 ; i < this._people.length; i++){

     str += '\n' + Object.values(this._people[i])
   }

   fs.writeFileSync('people.csv', str);
  }
}


let parser = new PersonParser('people.csv')


parser.buatList()
parser.addPerson(new Person(['201' , 'aa' , 'bb' , 'email' , '08212121' ,'2018']))
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
parser.save()
// parser.people
// parser.addPerson()
// console.log(parser._people)
// let person = new Person()
// console.log(person.getObject())