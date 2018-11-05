"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstname, lastname, email, phone, created) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.created = new Date(created);
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readfile() 
  }

  readfile() {
    var fileCsv = fs.readFileSync('people.csv', 'utf8').split('\n');
    var result = [];
    // console.log(typeof fileCsv);  //  string
    for (let i = 0; i < fileCsv.length; i++) {
      var splitted = fileCsv[i].split(',')
      result.push(new Person(splitted[0], splitted[1], splitted[2], splitted[3], splitted[4], splitted[5],))
    }
    return result;
  }

  get file() {
    return this._file;
  }
  get people() {
    return this._people
  }

  addPerson(data) {
    this._people.push(data);
  }

  toString () {
    var person = this._people;
    var result = [];
    for (let i = 0; i < person.length; i++) {
      var string = `${person[i].id},${person[i].firstname},${person[i].lastname},${person[i].email},${person[i].phone},${person[i].created}`;
      result.push(string)
    }
    return result.join('\n'); 
  }

  save() {
    fs.writeFileSync('people.csv', this.toString())
  }

}

let parser = new PersonParser('people.csv');
parser.addPerson(new Person(String(parser.people.length+1), 'Fauzan', 'Bintang', 'obin.aji@gmail.com', '0813-2951-8061', 'date'));
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

// var test = new PersonParser();
// console.log(parser._people);
// console.log(parser.people);