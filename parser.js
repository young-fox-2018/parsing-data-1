"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phoneNum, createdAt){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phoneNum;
    this.createdAt = new Date (createdAt);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.generatePeople();
  }

  get people() {
    return this._people;
  }

  addPerson(data) {
    parser.people.push(data);
  }

  generatePeople() {
    let result = [];
    let peopleCsv = fs.readFileSync(this._file, "UTF8").split("\n");

    for(let i = 0; i < peopleCsv.length ; i++){
      let splitted = peopleCsv[i].split(",");
      result.push(new Person(splitted[0], splitted[1], splitted[2], splitted[3], splitted[4], splitted[5]));
    }
    return result
  }

  save(){
    let str = ""
    for(let i = 0; i < parser.people.length; i++) {
      str += `${parser.people[i].id},${parser.people[i].firstName},${parser.people[i].lastName},${parser.people[i].email},${parser.people[i].phone},${parser.people[i].createdAt}\n`;
    }
    fs.writeFileSync(this._file, str);
  }
  
}

let parser = new PersonParser('people.csv');

parser.addPerson(new Person(100, "Trevor", "Belmont", "drunkJerk@gmail.com", "1-234-564-5645", "2015-8-01T06:08:44-07:00"));
// let newPerson = [112, "Trevor", "Belmont", "drunkJerk@gmail.com", "1-234-564-5645", "2013-11-01T06:08:44-07:00"]
console.log(parser);
parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`);
