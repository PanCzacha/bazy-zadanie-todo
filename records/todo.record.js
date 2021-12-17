const {pool, uuid} = require('../utils/db')

// Active Record - klasa to cała tabela, każda instancja tej klasy to pojedyńczy wiersz (rekord) w bazie danych

class ToDoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.date = obj.date;
    this._validate();
  }

  _validate() {
    if(this.title.trim().length < 5) {
      throw new Error('Todo title should be at least 5 characters long.')
    }
    if(this.title.length > 150) {
      throw new Error('Todo title should be at most 150 characters long.')
    }
  }

  async insert() {
    this.id = this.id ?? uuid();
    await pool.execute('INSERT INTO `todos` (`id`, `title`) VALUES (:id, :title)', {id: this.id, title: this.title,})
    return this.id;
  }

  async update() {
    if(!this.id) {
      throw new Error("Todo ID is not present");
    }
    this._validate();
    await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {id: this.id, title: this.title,})
    return this.id
  }

  async delete() {
    if(!this.id) {
      throw new Error("Todo ID is not present");
    }
    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {id: this.id,})
    return this.id
  }

  static async find(id) {
    const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {id,})
    return results.length === 1 ? new ToDoRecord(results[0]) : null;
  } // metody statyczne wywołujemy na całej klasie np. ToDoRecord.find('fsjfsfs')

  static async findAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results.map(result => new ToDoRecord(result))
  }

}

module.exports = {
  ToDoRecord,
}
