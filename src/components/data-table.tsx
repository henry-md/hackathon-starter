import type { Key, ReactNode } from "react";

export type DataTableColumn<Row> = {
  id: string;
  header: string;
  cell: (row: Row) => ReactNode;
  align?: "left" | "right";
};

export type DataTableProps<Row> = {
  caption: string;
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  rowKey: (row: Row) => Key;
};

export function DataTable<Row>({ caption, columns, rows, rowKey }: DataTableProps<Row>) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full border-collapse text-left text-base">
        <caption className="pb-3 text-left text-foreground">{caption}</caption>
        <thead className="border-b border-border bg-surface">
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col" style={{ textAlign: column.align }} className="whitespace-nowrap px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-border">
              {columns.map((column) => (
                <td key={column.id} style={{ textAlign: column.align }} className="px-4 py-3 align-top tabular-nums">
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={Math.max(columns.length, 1)} className="px-4 py-6 text-muted">No rows to show.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
