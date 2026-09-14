import assert from "node:assert/strict";
import test from "node:test";
import * as XLSX from "xlsx";
import { createDataFile, readDataFile, type DataSheet } from "../src/lib/tabular";

test("read a CSV and export result rows", async () => {
  const input = new File(['SKU,Item\n0012,"Nuts, bolts"\n'], "inventory.csv");
  const imported = await readDataFile(input);
  assert.deepEqual(imported[0].rows, [["SKU", "Item"], ["0012", "Nuts, bolts"]]);

  const output = createDataFile(
    [{ name: "Results", rows: [["Item", "Quantity"], ["Nuts, bolts", 18]] }],
    { format: "csv", fileName: "results.csv" },
  );
  const exported = await readDataFile(output);
  assert.deepEqual(exported[0].rows, [["Item", "Quantity"], ["Nuts, bolts", "18"]]);
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

test("read a binary .xls workbook and export its data as .xlsx", async () => {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
    ["Quarterly budget", null], ["Team", "Amount"], ["Support", 500],
  ]), "Budget");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([
    ["Code", "Active"], ["0012", true],
  ]), "People");
  const bytes: ArrayBuffer = XLSX.write(workbook, { type: "array", bookType: "biff8" });
  const input = new File([bytes], "example.XLS", { type: "application/vnd.ms-excel" });
  const imported = await readDataFile(input);
  assert.deepEqual(imported, [
    { name: "Budget", rows: [["Quarterly budget", null], ["Team", "Amount"], ["Support", 500]] },
    { name: "People", rows: [["Code", "Active"], ["0012", true]] },
  ]);

  const output = createDataFile(imported, { format: "xlsx", fileName: "results.xlsx" });
  assert.deepEqual(await readDataFile(output), imported);
  await assert.rejects(readDataFile(new File([bytes.slice(0, 8)], "truncated.xls")));
});

test("unreadable files are rejected", async () => {
  await assert.rejects(readDataFile(new File([], "empty.csv")));
  for (const extension of ["xlsx", "xls"]) {
    await assert.rejects(readDataFile(new File(["not an Excel workbook"], `broken.${extension}`)));
    await assert.rejects(readDataFile(new File(["Item,Amount\nExample,10"], `renamed.${extension}`)));
    await assert.rejects(readDataFile(new File(["PK plain text"], `misleading.${extension}`)));
  }
});
