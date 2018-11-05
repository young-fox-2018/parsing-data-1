"use strict"

let fs = require('fs')

class Person {
  constructor (id, first_name, last_name, email, phone, created_at ) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file.split("\n");
    this._file2 = this.commaSeparating();
    this._people = this.generatePeople();
  }

  commaSeparating(){
    let array = []
    for(let i = 0 ; i < this._file.length; i++){
      array.push(this._file[i].split(","))
    }

    return array;
  }


  get people() {
    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let result = new Person(id, first_name, last_name, email, phone, created_at);

    this._people.push(result)

    this.save()

  }

  generatePeople() {
    let result = []
    for(let i = 1 ; i < this._file2.length; i++){
      let j = new Person(this._file2[i][0],this._file2[i][1],this._file2[i][2],this._file2[i][3],this._file2[i][4],this._file2[i][5])
      result.push(j)
    }


    return result

  }
  
  save(){
    let result = "";

    result += "id,first_name,last_name,email,phone,created_at \n"
    for(let i = 0 ; i < this.people.length; i++){
      let cont = "";
      cont += `${this.people[i]["id"]},${this.people[i]["first_name"]},${this.people[i]["last_name"]},${this.people[i]["email"]},${this.people[i]["phone"]},${this.people[i]["created_at"]} \n`
      result += cont;
    }
    // console.log(result)
    fs.writeFileSync("./people.csv", result, 'utf8')
    console.log('saver success')
  }

}

let peoplecsv = fs.readFileSync('./people.csv', 'utf8').trim();
let parser = new PersonParser(peoplecsv);

parser.commaSeparating()

parser.addPerson(201, "Kevin", "Wijaya", "kevintanuhardi@gmail.com", "", new Date())


// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)