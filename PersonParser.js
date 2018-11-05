const Person = require('./Person.js');

class PersonParser {

    constructor(file) {
      this._file = file
      this._people = []
      this._arrPeople = null
      this.readFile()
    }
  
    get arrPeople() {
      return this._arrPeople;
    }
    
    get people() {
      return this._people;
    }
  
    get file() {
      return this._file;
    }
    
    readFile() {
      var fs = require('fs')
      this._arrPeople = fs.readFileSync(this.file).toString().split('\n');    
      this.convertArray();
    }
  
    convertArray(){
      for (let i = 1; i < this.arrPeople.length; i++) {
        let arr = this.arrPeople[i].split(',');
  
        // buat dahulu object literal :      
        let obj = {
          id: arr[0],
          firstName: arr[1],
          lastName: arr[2],
          email: arr[3],
          phone: arr[4],
          created: arr[5]
        }
  
        let person = new Person(obj);
        this._people.push(person);
      }
    }
  
    addPerson(obj) {
      this._people.push(obj);
    }
  
    save() {
      const fs = require('fs');
      let data = this.arrPeople[0] + '\n';
  
      for (let i = 0; i < this.people.length; i++) {
        data += Object.values(this.people[i]).join(',') + '\n';
      }
      
      // write to a new file named 2pac.txt
      fs.writeFileSync('newPeople.csv', data);
    }  
}

module.exports = PersonParser;