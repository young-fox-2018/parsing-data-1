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
    this._file = file;
    this._people = this.generatePeople();
  }



  get people() {
    return this._people
  }

  get file(){
    return this._file
  }

  addPerson(newPerson) {
    this._people.push(newPerson)

    this.save()
    
  }
  
  generatePeople() {
    let data = fs.readFileSync(`./${this._file}`, 'utf8').trim().split("\n")
    
    let array = []
    for(let i = 0 ; i < data.length; i++){
      array.push(data[i].split(","))
    }

    


    let result = []
    for(let i = 1 ; i < array.length; i++){
      let j = new Person(array[i][0],array[i][1],array[i][2],array[i][3],array[i][4],array[i][5])
      result.push(j)
    }
    return result

  }
  
  save(){
    let result = "";

    result += "id,first_name,last_name,email,phone,created_at \n"
    for(let i = 0 ; i < this._people.length; i++){
      let cont = "";
      cont += `${this._people[i]["id"]},${this._people[i]["first_name"]},${this._people[i]["last_name"]},${this._people[i]["email"]},${this._people[i]["phone"]},${this._people[i]["created_at"]} \n`
      result += cont;
    }
    // console.log(result)
    fs.writeFileSync("./people.csv", result, 'utf8')
    console.log('saver success')
  }

}

let parser = new PersonParser('people.csv');

parser.addPerson(new Person (201, "Kevin", "Wijaya", "kevintanuhardi@gmail.com", "", new Date()))
// console.log(parser.people)


console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)