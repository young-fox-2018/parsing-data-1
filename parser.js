"use strict"
const fs = require('fs')
const Person = require('./person')

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  readData() {
    return fs.readFileSync(this._file, 'utf8')
  }

  addPerson(input) {
    this._people.push(input)
  }

  save() {
    let data = this.readData()
    let splitEnter = data.split('\n')
    let arr = []
    for (let i = 0; i < splitEnter.length; i++) {
      let splitComma = splitEnter[i].split(',')
      arr.push(splitComma)
    }
    for (let i = 0; i < this._people.length; i++) {
      let arrInput = []
      for (const key in this._people[i]) {
        arrInput.push(this._people[i][key])
      }
      arr.push(arrInput)
    }    
    let result = ''
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === arr[arr.length - 1]) {
        result += arr[i].join(',')
      }
      else {
        result += arr[i].join(',') + '\n'
      }
    }
    fs.writeFileSync('people.csv', result)
  }
}

let parser = new PersonParser('people.csv')
parser.people
parser.addPerson(new Person('201', 'Sendy', 'Akbar', 'sendyakbar@hotmail.com', '0811-1820-525'))
parser.addPerson(new Person('202', 'Aries', 'Dimas', 'dimas@hotmail.com', '0813-1820-5255'))
parser.save()
console.log(`You added ${parser._people.length} data to '${parser._file}' file.`)