"use strict"
const Person = require("./person")
var fs = require('fs')


class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.convert()
  }

  get people() {
    return this._people
  }


  addPerson(param) {
    this._people.push(param)
  }
  writeFile(file, data) {
    fs.writeFileSync(file, data)
  }

  save() {
    var result = ""
    let key = Object.keys(this._people[0]).join(",")
    result = key + "\n"
    for (let i = 0; i < this._people.length; i++) {
      let values = Object.values(this._people[i]);
      let join = values.join(',');
      result += join + "\n"
    }
    this.writeFile("people.csv", result)
  }

  convert() {
    let peopleData = fs.readFileSync(this._file, "utf8")
    let data = peopleData.split("\n")
    let convertResult = []
    for (let i = 1; i < data.length; i++) {
      let dataSplit = data[i].split(",")
      let convertData = new Person(dataSplit[0], dataSplit[1], dataSplit[2], dataSplit[3], dataSplit[4], dataSplit[5])
      convertResult.push(convertData)
    }
    return convertResult
  }
}
let parser = new PersonParser('people.csv')
parser.addPerson(new Person("201", "Lamda", "Rollingston", "bandit@quam.com", "1 - 633 - 389 - 7173", new Date().toISOString()))
parser.save()

