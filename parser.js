const fs = require("fs")
"use strict"
class Person {
  constructor(file){
    this.id = file[0]
    this.first_Name = file[1]
    this.last_Name = file[2]
    this.email = file[3]
    this.phone = file[4]
    this.created = new Date(file[5])
  }
  // Look at the above CSV file
  // What attributes should a Person object have?

}

class PersonParser {
  
  constructor(file) {
    this._file =  file
    this._people = []
    this.myfile = fs.readFileSync(this._file,'utf8').split('\n')
  }
  
  get people() {
    return this._people
  }


  parsingData() {
    var awal;
    for(let i = 1 ; i < this.myfile.length; i++){
        
        let people1 = new Person(this.myfile[i].split(","))
        this._people.push(people1)
      
      // console.log(people1)
    }
    return this
  }
  
  addPerson(data) {
    this._people.push(data)
    
  }

  save(){
    let file = this.myfile[0]
    // // console.log(file)
    var str = file
    for(var i = 0 ; i < this._people.length; i++){

      str +=  "\n"+Object.values(this._people[i]).join(",")
    }
    
    fs.writeFileSync('people.csv', str);
  }
}


let parser = new PersonParser('people.csv')
parser.parsingData()
// console.log(parser._people)
parser.addPerson(new Person(['201','bobby','fritz','bobby@gmail.com','89988768','2018']))
// parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
parser.save()
// console.log(parser.people[parser.people.length-2])
// console.log(parser.myfile[0])