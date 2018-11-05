"use strict"
const fs = require('fs')
class Person {

  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

readData(){
    return fs.readFileSync(this._file,'utf8')
    .toString()
    .split("\n")

}

  parsingData() {
    let people_string = this.readData()

    for (var i = 1; i < people_string.length -1; i++) {
      let Peoplelist = people_string[i].split(',');
      let obj = new Person(Peoplelist[0], Peoplelist[1], Peoplelist[2], Peoplelist[3], Peoplelist[4], Peoplelist[5]);
      this._people.push(obj);
    }
    return this._people;
  }

  addPerson(personBaru) {
    this._people.push(personBaru);
  }

  saveNewList () {
    let convert = '' + Object.keys(this._people[0])
    for (var i = 1; i < this._people.length; i++) {
      let temp = Object.values(this._people[i]);
      convert += '\n' + temp;
    }
    fs.writeFileSync('people.csv', convert, 'utf8');
  }

  get people() {
    let obj = {
      size: this._people.length
    }
    return obj;
  }
}

let parser = new PersonParser("parsing-data-1/people.csv");
parser.parsingData();

let andromeda = new Person('201','Andromeda', 'Kambira', 'tralali@gmail.com', '1-519-693-8091', '2018-12-11T21:28:41-19:00')

parser.addPerson(andromeda);
parser.saveNewList();

console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
