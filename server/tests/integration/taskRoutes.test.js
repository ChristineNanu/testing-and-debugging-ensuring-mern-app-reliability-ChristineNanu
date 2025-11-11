const request = require('supertest');
const app = require('../../app');
const db = require('../../utils/test-db');

beforeAll(async () => db.connect());
afterEach(async () => db.clearDatabase());
afterAll(async () => db.closeDatabase());

test('POST /tasks creates a task', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ name: 'Test Task' });
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe('Test Task');
});
