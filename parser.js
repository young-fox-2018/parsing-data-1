"use strict"

let fs = require('fs');

class Person {
  constructor(id, firstName, lastName, email, phone, created) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.crated_at = created;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = this.csvConverter();
  }

  get people() {
    return this._people;
  }

  csvConverter() {
    let data = fs.readFileSync('people.csv', 'utf8').toString().split("\n")
    let arrObj = [];
    for (let i = 0; i < data.length; i++) {
      let arr = data[i].split(',');
      arrObj.push(new Person(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]));
    }
    return arrObj;
  }

  addPerson(obj) {
    this._people.push(obj);
  }
  save() {
    let result = '';
    let keys = Object.keys(this._people[0]).join(',');
    result += keys + '\n';

    for (let i = 0; i < this._people.length; i++) {
      let values = Object.values(this._people[i]);
      let join = values.join(',');
      result += join + '\n';
      fs.writeFileSync('people.csv', result);
    }
  }
}



let parser = new PersonParser('people.csv');

console.log(`There are ${parser.people.length} people.`)
//parser.people;

parser.addPerson(new Person('201', 'Muhammad', 'Khevin', 'muhammadkhevin@gmail.com', '0857823232', new Date().toISOString()));
//console.log(parser.people);

//save data
parser.save();
