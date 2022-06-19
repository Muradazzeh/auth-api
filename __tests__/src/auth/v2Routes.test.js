'use strict';

process.env.SECRET = "TEST_SECRET";

const { db } = require('../../../src/auth/models/index');
const supertest = require('supertest');
const server = require('../../../src/server').server;

const mockRequest = supertest(server);

let userData = {
  testUser: { username: 'user', password: 'password' },
};
let accessToken = null;
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
describe('V2 routes test ', () => {

it('Trying to access V2 clothes routes with normal user', async () => {

    const response = await mockRequest.get('/api/v2/clothes').set(clothesData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(500);
    expect(userObject.message).toBe("Invalid Login")
  });
  it('Trying to access V2 food routes with normal user role also user ', async () => {

    const response = await mockRequest.get('/api/v2/food').set(foodData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(500);
    expect(userObject.message).toBe("Invalid Login")
  });
  it('Can create a new user', async () => {

    const response = await mockRequest.post('/signup').send(userData.testUser);
    const userObject = response.body;
    console.log(userObject)
    expect(response.status).toBe(201);
    expect(userObject.username).toEqual(userData.testUser.username);
  });
  it('Can signin with bearer auth token and can get to the clothes route', async () => {
    let { username, password } = userData.testUser;

    // First, use basic to login to get a token
    const response = await mockRequest.post('/signin')
      .auth(username, password);

    accessToken = response.body.token;
    console.log(">>>>>>>>>>>>>>>",accessToken)
    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .get('/api/v2/clothes')
      .set('Authorization', `Bearer ${accessToken}`);

    // Not checking the value of the response, only that we "got in"
    expect(bearerResponse.status).toBe(200);
  });
  it('Can signin with bearer auth token and can get to the food route', async () => {
    let { username, password } = userData.testUser;

    // First, use basic to login to get a token
    const response = await mockRequest.post('/signin')
      .auth(username, password);

    accessToken = response.body.token;
    console.log(">>>>>>>>>>>>>>>",accessToken)
    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .get('/api/v2/food')
      .set('Authorization', `Bearer ${accessToken}`);

    // Not checking the value of the response, only that we "got in"
    expect(bearerResponse.status).toBe(200);
  });
  it('Can signin with bearer auth token as user  and try to post on clothes route ', async () => {
    let { username, password } = userData.testUser;

    // First, use basic to login to get a token
    const response = await mockRequest.post('/signin')
      .auth(username, password);

    accessToken = response.body.token;
    console.log(">>>>>>>>>>>>>>>",accessToken)
    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .get('/api/v2/food')
      .set('Authorization', `Bearer ${accessToken}`);

    // Not checking the value of the response, only that we "got in"
    expect(bearerResponse.status).toBe(200);
  });


})