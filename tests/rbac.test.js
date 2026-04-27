const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../src/models");


let userToken;
let adminToken;
let taskId;

beforeAll(async () => {

  // create tables
  await sequelize.sync({ force: true });

  // create normal user
  await request(app).post("/api/register").send({
    name: "User A",
    email: "user@test.com",
    password: "123456"
  });

  // login user
  const userRes = await request(app).post("/api/login").send({
    email: "user@test.com",
    password: "123456"
  });

  userToken = userRes.body.token;

  // create admin
  await request(app).post("/api/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "123456"
  });

  // manually update role to admin
  const { User } = require("../src/models");
  await User.update(
    { role: "admin" },
    { where: { email: "admin@test.com" } }
  );

  // login admin
  const adminRes = await request(app).post("/api/login").send({
    email: "admin@test.com",
    password: "123456"
  });

  adminToken = adminRes.body.token;

  // create a task as user
  const taskRes = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${userToken}`)
    .send({
      title: "User Task",
      priority: "high"
    });

  // store taskId correctly
  taskId = taskRes.body.taskId;
});

afterAll(async () => {
  await sequelize.close();
});

describe("RBAC (Role-Based Access Control)", () => {

  it("admin should be able to update any task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Updated by admin" });

    expect(res.statusCode).toBe(200);
  });

  it("user should NOT update another user's task", async () => {

    // create another user
    await request(app).post("/api/register").send({
      name: "User B",
      email: "userB@test.com",
      password: "123456"
    });

    const loginRes = await request(app).post("/api/login").send({
      email: "userB@test.com",
      password: "123456"
    });

    const otherToken = loginRes.body.token;

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ title: "Hacked attempt" });

    // correct expectation
    expect(res.statusCode).toBe(403);
  });

});