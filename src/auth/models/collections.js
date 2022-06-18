'use strict';



class DataCollection {

  constructor(model) {
    this.model = model;
  }

  async get(data_id) {
    try {
        let record = null;
        if (data_id) {
          
            record = await this.model.findOne({ where: { id: data_id } });
            return record;
        }
        else {
           
            record = await this.model.findAll();
            return record;
        }

    } catch (e) {
        console.error("error in reading record in model ", this.model)
    }

}

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOne({ where: { id } })
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id }});
  }

}

module.exports = DataCollection;