"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui";

const steps = ["Upload", "Business logic", "Export"] as const;
type Step = 1 | 2 | 3;

export default function Home() {
  const [workbook, setWorkbook] = useState<File | null>(null);
  const [notice, setNotice] = useState({ errorMessage: "", downloadStarted: false });
  const fileInput = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>(1);
  const stepHeading = useRef<HTMLHeadingElement>(null);

  function goToStep(nextStep: Step) {
    if (nextStep > 1 && !workbook) return;
    setStep(nextStep);
    setNotice({ errorMessage: "", downloadStarted: false });
    window.requestAnimationFrame(() => stepHeading.current?.focus());
  }

  function importExcel(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      setNotice({ errorMessage: "Choose an Excel file (.xlsx or .xls).", downloadStarted: false });
      return;
    }

    setWorkbook(file);
    setNotice({ errorMessage: "", downloadStarted: false });
  }

  function exportExcel() {
    if (!workbook) return;

    try {
      const url = URL.createObjectURL(workbook);
      const link = document.createElement("a");
      link.href = url;
      const extensionIndex = workbook.name.lastIndexOf(".");
      link.download = `${workbook.name.slice(0, extensionIndex)}-copy${workbook.name.slice(extensionIndex)}`;
      document.body.append(link);
      link.click();
      link.remove();
      // Keep the object URL alive until the browser has started the download.
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice({ errorMessage: "", downloadStarted: true });
    } catch {
      setNotice({ errorMessage: "The Excel file could not be exported. Try again.", downloadStarted: false });
    }
  }

  return (
    <>
      <AppHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-background focus:outline-none">
        <div className="page-container py-16 sm:py-24">
          <h1 className="display-heading max-w-4xl">Your hackathon workspace</h1>
          <ol aria-label="Excel workflow" className="mt-12 flex flex-wrap items-center gap-3">
            {steps.map((label, index) => {
              const number = (index + 1) as Step;
              const current = number === step;
              return (
                <li key={label}>
                  <button
                    type="button"
                    aria-label={`Step ${number}: ${label}`}
                    aria-current={current ? "step" : undefined}
                    disabled={number > 1 && !workbook}
                    onClick={() => goToStep(number)}
                    className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed ${current ? "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary" : "bg-surface text-muted hover:bg-surface-hover active:bg-border disabled:bg-surface"}`}
                  >
                    <span aria-hidden="true">
                      {number}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <section aria-labelledby="step-heading" className="mt-10 max-w-2xl">
            <h2 id="step-heading" ref={stepHeading} tabIndex={-1} className="section-heading">
              {steps[step - 1]}
            </h2>
            {step === 1 && (
              <>
                <p className="mt-3 text-muted">Choose your Excel file to get started.</p>
                <Button
                  className="mt-6"
                  variant={workbook ? "secondary" : "primary"}
                  onClick={() => fileInput.current?.click()}
                >
                  Upload Excel
                </Button>
                <p role="status" className="mt-3 text-sm text-muted wrap-anywhere">
                  {workbook ? workbook.name : ".xlsx or .xls"}
                </p>
              </>
            )}
            {step === 3 && (
              <p id="export-help" className="mt-3 text-muted">
                Download a copy of your original Excel file.
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              {step > 1 && (
                <Button variant="secondary" className="mr-auto" onClick={() => goToStep(step === 3 ? 2 : 1)}>
                  Back
                </Button>
              )}
              <Button
                onClick={step === 3 ? exportExcel : () => goToStep(step === 1 ? 2 : 3)}
                disabled={!workbook}
                aria-describedby={step === 3 ? "export-help" : undefined}
              >
                {step === 3 ? "Export Excel" : "Continue"}
              </Button>
            </div>
          </section>
          <input
            ref={fileInput}
            type="file"
            accept=".xlsx,.xls"
            aria-label="Choose an Excel file"
            onChange={importExcel}
            hidden
          />
          <p role={notice.errorMessage ? "alert" : "status"} className="mt-6 max-w-2xl text-sm wrap-anywhere">
            {notice.errorMessage || (notice.downloadStarted && "Excel download started.")}
          </p>
        </div>
      </main>
    </>
  );
}
