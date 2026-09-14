import assert from "node:assert/strict";
import test from "node:test";
import Database from "better-sqlite3";

test("the bundled SQLite native binary supports reads and writes", () => {
  const database = new Database(":memory:");
  try {
    database.exec("CREATE TABLE items (name TEXT NOT NULL)");
    database.prepare("INSERT INTO items (name) VALUES (?)").run("sample");
    assert.deepEqual(database.prepare("SELECT name FROM items").all(), [
      { name: "sample" },
    ]);
  } finally {
    database.close();
  }
});
