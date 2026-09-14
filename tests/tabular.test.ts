import assert from "node:assert/strict";
import test from "node:test";
import { createDataFile, readDataFile, type DataSheet } from "../src/lib/tabular";

test("read a CSV and export result rows", async () => {
  const input = new File(['SKU,Item\n0012,"Nuts, bolts"\n'], "inventory.csv");
  const imported = await readDataFile(input);
  assert.deepEqual(imported[0].rows, [["SKU", "Item"], ["0012", "Nuts, bolts"]]);

  const output = createDataFile(
    [{ name: "Results", rows: [["Item", "Quantity"], ["Nuts, bolts", 18]] }],
    { format: "csv", fileName: "results.csv" },
  );
  assert.equal(await output.text(), 'Item,Quantity\r\n"Nuts, bolts",18');
});

test("Excel supports multiple sheets and headers below the first row", async () => {
  const sheets: DataSheet[] = [
    { name: "Budget", rows: [["Quarterly budget", null], ["Team", "Amount"], ["Support", 500]] },
    { name: "People", rows: [["Name", "Active"], ["Sam", true]] },
  ];
  const file = createDataFile(sheets, { format: "xlsx", fileName: "example.xlsx" });
  const imported = await readDataFile(file);
  assert.deepEqual(imported, sheets);
});

test("unreadable files return understandable errors", async () => {
  await assert.rejects(readDataFile(new File([], "empty.csv")), /empty/i);
  await assert.rejects(readDataFile(new File(["not an Excel workbook"], "broken.xlsx")), /workbook/i);
});
