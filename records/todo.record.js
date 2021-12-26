const {pool, uuid} = require('../utils/db')
const { tooShortError, tooLongError, noIdError, notFoundError} = require("../utils/error")

class ToDoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.date = obj.date;
    this._validate();
  }

  _validate() {
    if(this.title.trim().length < 5) {
      throw new tooShortError;
    }
    if(this.title.length > 150) {
      throw new tooLongError;
    }
  }

  async insert() {
    this.id = this.id ?? uuid();
    await pool.execute('INSERT INTO `todos` (`id`, `title`) VALUES (:id, :title)', {id: this.id, title: this.title,})
    return this.id;
  }

  async update() {
    if(!this.id) {
      throw new noIdError;
    }
    await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {id: this.id, title: this.title,})
    return this.id
  }

  async delete() {
    if(!this.id) {
      throw new noIdError;
    }
    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {id: this.id,})
    return this.id
  }

  static async find(id) {
    const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {id,})
    if(id.length !== 36) {
      throw new notFoundError;
    } else if (results.length === 0) {
      throw new noIdError;
    }
    return new ToDoRecord(results[0]);
  }

  static async findAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results.map(result => new ToDoRecord(result))
  }

}

module.exports = {
  ToDoRecord,
}
