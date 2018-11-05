"use strict"

const Person = require('./Person.js');
const PersonParser = require('./PersonParser.js');

const parser = new PersonParser('people.csv')

const obj = {
  id: 201,
  firstName: 'Desy',
  lastName: 'Rachmawati',
  email: 'desy.armariena@gmail.com',
  phone: '0853',
  created: '2015-03-25T12:00:00Z'
}

let person1 = new Person(obj);
console.log(`List people:`, parser.people);
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.addPerson(person1);

console.log(`New list people:`, parser.people);
parser.save();