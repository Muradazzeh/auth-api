'use strict';

const express = require('express');
const dataModules = require('../auth/models');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = parseInt(req.params.id)
  
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);

}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = parseInt(req.params.id)
  const obj = req.body;
  let foundId=await req.model.get(id)
  if(foundId){
  let updatedRecord = await req.model.update(id, obj)
  res.status(201).json(updatedRecord);
}
else{
    res.send("there is no Id found ")
}
}

async function handleDelete(req, res) {
  let id = parseInt(req.params.id)
  let foundId=await req.model.get(id)
  if(foundId){
  let deletedRecord = await req.model.delete(id);
  res.status(204).send({
    deleted: deletedRecord,
 massage:"successfuly deleted"});
 }
  else{
    res.send("no Id found")
  }
}


module.exports = router;