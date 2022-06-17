'use strict';

process.env.SECRET = "TEST_SECRET";

const { db } = require('../../../src/auth/models/index');
const supertest = require('supertest');
const server = require('../../../src/server').server;

const mockRequest = supertest(server);

let clothesData = {
  testUser: { name: 'jens', color: 'red',size: "xl" },
};
let foodData = {
  testUser: { name: 'patata', calories: 100,type: "vegetable" },
};


beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('V1 routes test ', () => {

  it('Can create a new clothes', async () => {

    const response = await mockRequest.post('/api/v1/clothes').send(clothesData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(201);
    expect(userObject.name).toEqual(clothesData.testUser.name);
  });
  it('Can create a new food', async () => {

    const response = await mockRequest.post('/api/v1/food').send(foodData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(201);
    expect(userObject.name).toEqual(foodData.testUser.name);
  });

  it('Can get a clothes', async () => {

    const response = await mockRequest.get('/api/v1/clothes').set(clothesData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(200);
    expect(typeof userObject).toEqual("object");
  });
  it('Can get food', async () => {

    const response = await mockRequest.get('/api/v1/food').set(foodData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(200);
    expect(typeof userObject).toEqual("object");
  });
  it('Can  a update  clothes', async () => {

    const response = await mockRequest.put('/api/v1/clothes/1')
  
    expect(response.status).toBe(201);
    // expect(typeof userObject).toEqual("object");
  });
  it('Can update one item food', async () => {

    const response = await mockRequest.put('/api/v1/food/1')
    
    expect(response.status).toBe(201);
    // expect(typeof userObject).toEqual("object");
  });
  it('Can  a delete  clothes', async () => {

    const response = await mockRequest.delete('/api/v1/clothes/1')
  
    expect(response.status).toBe(204);
    // expect(typeof userObject).toEqual("object");
  });
  it('Can delete one item food', async () => {

    const response = await mockRequest.delete('/api/v1/food/1')
    
    expect(response.status).toBe(204);
    // expect(typeof userObject).toEqual("object");
  });


});