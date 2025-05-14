const request = require("supertest");
const app = require("./index");

describe("GET /api/menu", () => {
  it("should return menu JSON", async () => {
    const res = await request(app).get("/api/menu");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeDefined();
  });
});
