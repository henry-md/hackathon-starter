import Image from "next/image";

export function AppHeader() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="page-container flex min-h-18 items-center py-3 sm:py-0">
          <div className="flex items-center gap-4">
            <Image src="/cdr-logo.svg" width={124} height={34} alt="CD&R" />
            <span aria-hidden="true" className="h-5 border-l border-border" />
            <span className="text-sm text-muted">Hackathon</span>
          </div>
        </div>
      </header>
    </>
  );
}
