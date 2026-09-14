"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui";

export default function Home() {
  const [csv, setCsv] = useState<File | null>(null);
  const [notice, setNotice] = useState({ message: "", error: false });
  const fileInput = useRef<HTMLInputElement>(null);

  function importCsv(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setNotice({ message: "Choose a .csv file.", error: true });
      return;
    }

    setCsv(file);
    setNotice({ message: `Imported ${file.name}.`, error: false });
  }

  function exportCsv() {
    if (!csv) return;

    try {
      const url = URL.createObjectURL(csv);
      const link = document.createElement("a");
      link.href = url;
      const extensionIndex = csv.name.lastIndexOf(".");
      link.download = extensionIndex > 0
        ? `${csv.name.slice(0, extensionIndex)}-copy${csv.name.slice(extensionIndex)}`
        : `${csv.name}-copy`;
      document.body.append(link);
      link.click();
      link.remove();
      // Keep the object URL alive until the browser has started the download.
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice({ message: "CSV download started.", error: false });
    } catch {
      setNotice({ message: "The CSV could not be exported. Try again.", error: true });
    }
  }

  return (
    <>
      <AppHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-cream">
        <div className="page-container py-20 sm:py-28">
          <h1 className="display-heading max-w-4xl">Your hackathon workspace</h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={() => fileInput.current?.click()}>
              Import CSV
            </Button>
            <Button
              variant="secondary"
              onClick={exportCsv}
              disabled={!csv}
              title={!csv ? "Import a CSV to enable export" : undefined}
            >
              Export CSV
            </Button>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept=".csv"
            aria-label="Choose a CSV file"
            onChange={importCsv}
            hidden
          />
          <p role={notice.error ? "alert" : "status"} className="mt-6 max-w-2xl text-sm wrap-anywhere">
            {notice.message}
          </p>
        </div>
      </main>
    </>
  );
}
