import * as assert from "assert";

import { match } from "../helpers";

suite("helpers", () => {
  suite("match", () => {
    suite("for comments", () => {
      test("should return false", () => {
        assert.equal(match("# this is a comment", "src/something.ts"), false);
      });
    });
    suite("for global matcher", () => {
      test("should return true", () => {
        assert.equal(match("*", "src/something.ts"), true);
      });
    });
    suite("for file type", () => {
      test("should return true if filetype is same", () => {
        assert.equal(match("*.js", "something.js"), true);
      });
      test("should return true if filetype in nested folder is same", () => {
        assert.equal(match("*.js", "path/to/something.js"), true);
      });
      test("should return true for multiple extensions", () => {
        assert.equal(match("*.js", "path/to/something.test.js"), true);
      });
      test("should return false if filetype is different", () => {
        assert.equal(match("*.js", "something.ts"), false);
      });
    });
  });
});
