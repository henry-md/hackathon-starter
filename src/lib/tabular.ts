import Papa from "papaparse";
import * as XLSX from "xlsx";

export type CellValue = string | number | boolean | Date | null;
export type DataSheet = { name: string; rows: CellValue[][] };

/** Read worksheets as rows. Each app chooses its own headers and schema. */
export async function readDataFile(file: File): Promise<DataSheet[]> {
  if (!file.size) throw new Error("This file is empty.");

  if (/\.csv$/i.test(file.name)) {
    const text = await file.text();
    const parsed = Papa.parse<string[]>(text, { dynamicTyping: false });
    const error = parsed.errors.find((item) => item.code !== "UndetectableDelimiter");
    if (error) throw new Error(`Could not read CSV: ${error.message}`);
    // A final line ending does not represent another record.
    if (/[\r\n]$/.test(text) && parsed.data.at(-1)?.[0] === "" && parsed.data.at(-1)?.length === 1) {
      parsed.data.pop();
    }
    return [{ name: "Sheet1", rows: parsed.data }];
  }

  const extension = file.name.match(/\.(xlsx|xls)$/i)?.[1].toLowerCase();
  if (!extension) throw new Error("Choose a CSV, .xlsx, or .xls file.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  // SheetJS also reads plain text, so reject renamed files before its format detection.
  const signature = extension === "xlsx"
    ? [0x50, 0x4b, 0x03, 0x04]
    : [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];
  if (!signature.every((byte, index) => bytes[index] === byte)) {
    throw new Error("This is not an Excel workbook.");
  }

  try {
    const workbook = XLSX.read(bytes, { type: "array", cellDates: true });
    return workbook.SheetNames.map((name) => ({
      name,
      rows: XLSX.utils.sheet_to_json<CellValue[]>(workbook.Sheets[name], {
        header: 1, defval: null, blankrows: true, range: 0,
      }),
    }));
  } catch {
    throw new Error("Could not read this Excel workbook.");
  }
}

/** Export the supplied values; this does not reproduce an original workbook's layout. */
export function createDataFile(
  sheets: DataSheet[],
  options: { format: "csv" | "xlsx"; fileName: string },
): File {
  if (!sheets.length) throw new Error("Add a sheet before exporting.");
  if (options.format === "csv") {
    if (sheets.length !== 1) throw new Error("CSV supports one sheet. Use Excel for multiple sheets.");
    const text = Papa.unparse(sheets[0].rows, { escapeFormulae: true });
    return new File([text], options.fileName, { type: "text/csv;charset=utf-8" });
  }

  const workbook = XLSX.utils.book_new();
  for (const sheet of sheets) {
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(sheet.rows), sheet.name);
  }
  const bytes: ArrayBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  return new File([bytes], options.fileName, {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

export function downloadDataFile(file: File): void {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
