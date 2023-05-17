import { testing } from "../src/index.js";

test("test run", () => {
  expect(testing(1, 2)).toBe(3);
});
