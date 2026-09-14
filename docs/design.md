# CD&R visual guide

Use this guide when creating or changing a page. The starter borrows CD&R's typography, palette, and restrained layout so different hackathon demos feel related. Build the smallest useful screen and reuse the styles and components already here.

Each participant builds their own application from this repository. The initial screen is deliberately small: the CD&R brand header, “Your hackathon workspace,” and Import CSV / Export CSV actions. Add screens and workflows only as the participant's demo needs them.

## Reference and scope

Inspected on **September 14, 2026**:

- [CD&R homepage](https://www.cdr.com/).
- [The homepage's stylesheet](https://www.cdr.com/build/assets/app-D3n8TJfn.css), including its font declarations, color tokens, and responsive rules.

This is a practical guide derived from the public site, not an official CD&R brand manual. Values described as **observed** come from that site. **Application adaptations** make those choices work for forms, tables, and short hackathon demos.

## Visual direction

Use dark navy text, white space, expressive serif headings, and clear sans-serif body copy. Give each page one prominent title and an obvious next action. Use cream, sage, and teal sparingly to distinguish meaningful areas.

The reference site uses broad rectangular photography, alternating image/text sections, and news rows separated by fine rules. Carry over that calm hierarchy. Choose simple sections and ruled rows before adding more cards, shadows, or decorative effects.

## Palette

These hex values are observed in the source stylesheet. Their starter roles are application adaptations.

| Color | Value | Starter use |
| --- | --- | --- |
| Navy | `#102231` | Main text, header logo, primary action |
| White | `#FFFFFF` | Page background, inverse text |
| Cream | `#F1E9D5` | Introductory or supporting areas |
| Sage | `#CADAC2` | Gentle emphasis or supporting areas |
| Teal | `#8EAFAE` | Gentle emphasis or supporting areas |
| Dark teal | `#597B7C` | Optional brand accent |
| Green | `#617D63` | Optional brand accent |
| Tan | `#BF916B` | Optional brand accent |
| Brown | `#65524D` | Optional brand accent |
| Neutral surface | `#F3F3F4` | Secondary controls and quiet surfaces |
| Neutral hover | `#E6E7E8` | Hover on neutral controls |
| Divider | `#D9DBDD` | Section and table separators |
| Muted text | `#636D75` | Secondary application copy |
| Input border | `#7D858C` | Visible form boundaries |
| Focus blue | `#006AFF` | Keyboard focus indicator |

Use semantic Tailwind classes from [globals.css](../src/app/globals.css), rather than repeating hex values:

| Purpose | Classes |
| --- | --- |
| Page and copy | `bg-background text-foreground` |
| Secondary copy | `text-muted` |
| Quiet surface | `bg-surface` |
| Primary action | `bg-primary text-primary-foreground` |
| Accent areas | `bg-cream`, `bg-sage`, `bg-teal` |
| Dividers and inputs | `border-border`, `border-input` |
| Keyboard focus | `outline-ring` |

The full palette lives in `--cdr-*` variables in that same file. Change shared values there when adjusting the theme. Keep dark text on pale accents; do not rely on color alone to communicate a state.

The local [CD&R logo](../public/cdr-logo.svg) comes from the homepage's `#logo-124` SVG symbol (124 × 34 viewBox), rendered in navy in the starter header. Preserve its proportions.

## Typography

The site uses three font families. The starter loads their regular faces from [local font files](../src/app/fonts) through `next/font/local` in [layout.tsx](../src/app/layout.tsx), so page rendering does not depend on a remote font service.

| Family | Observed weight | Local file in `src/app/fonts/` | Class |
| --- | --- | --- | --- |
| Basel Grotesk | Variable 100–900; body 430, emphasis 535 | `Basel-Grotesk-Essential-Variable-DLsVmAqn.woff2` | `font-sans` |
| Feature Deck | 400 | `FeatureDeck-Regular-Web-BDk3ax68.woff2` | `font-heading` |
| Feature Display | 400 | `FeatureDisplay-Regular-Web-DeS-3LWM.woff2` | `font-display` |

The observed public font URLs use the same filenames under `https://www.cdr.com/build/assets/`. The site also declares regular italic Feature Deck and Feature Display faces; those are not needed for this starter.

**Observed:** the homepage title uses Feature Display at 40px, 48px from a 600px viewport, and 72px from 1200px, with 1.1 line height. Body copy is Basel Grotesk at 18px, rising to 20px from 1200px, with 1.2 line height. Small headings use Feature Deck; larger headings use Feature Display.

**Application adaptations:** use 16px body copy with 1.5 line height for forms and tables. Use regular-weight Feature Deck at 32px for section headings. The Feature Display page title scales fluidly with `clamp(2.5rem, 5vw, 4.5rem)` (40–72px), instead of using the website's breakpoint steps. Keep labels and controls in Basel Grotesk. Avoid bold display headings, decorative letter spacing, or introducing another font.

## Layout and interaction

**Observed:** the site has a 12-column grid with 12px mobile gutters and 16px gutters from 600px. Content alternates between large images and text, with generous vertical spacing. Homepage buttons are neutral gray pills with navy text, 40px high, 16px horizontal padding, and an 8px icon gap. Neutral hover changes to `#E6E7E8`. Focus uses a blue outline with a 2px offset.

**Application adaptations:** use a minimum 72px header that can wrap on mobile, a 1280px container maximum, and 24/32/48px side padding at Tailwind's base/sm/lg breakpoints. Stack columns on small screens. Make controls at least 44px high with 24px button padding, use a navy filled primary action, and retain the neutral pill style for secondary actions. Use 150ms button color transitions and a 3px keyboard focus offset; remove motion when reduced motion is requested. Use stronger input borders than decorative dividers. Keep the starter light regardless of the system color scheme.

Prefer short labels, visible field labels, native form behavior, and clear empty states. Preserve keyboard focus styles. State changes and errors must include text. Allow titles and forms to wrap without horizontal page scrolling.

## Reuse before creating

Start with these files:

- [AppHeader](../src/components/app-header.tsx): shared brand header.
- [UI components](../src/components/ui.tsx): `Button`, `Input`, and `Select`.
- [DataTable](../src/components/data-table.tsx) and [FileUpload](../src/components/file-upload.tsx): optional components for requested data features; see [the data guide](tabular-data.md). These are not mounted in the starter.
- [Starter page](../src/app/page.tsx): a title and working CSV import/export actions.
- [Global styles](../src/app/globals.css): palette, semantic tokens, typography, and shared base styling.

Use `Button` with `variant="primary"` for the main action and `variant="secondary"` for supporting actions. Reuse `Input` and `Select` when the demo needs form controls.

Keep the initial screen limited to the title and two actions, with feedback shown after an action. Import accepts `.csv` files only, without validating or processing their contents. Export stays disabled until a CSV is selected, then downloads its original bytes unchanged. The page stores the original `File` in `csv`; refreshing clears this browser state. See [CSV data](../README.md#csv-data) for the implementation. Connect SQLite only if the chosen demo needs persistence.

## Patterns to follow

- Give each page one clear title, one main action, and a small number of useful sections.
- Use serif headings with sans-serif labels and data; keep numeric columns easy to scan.
- Separate dense information with alignment, spacing, and thin rules.
- Use a pale accent when it helps explain a section or state; keep most of the page white.
- Reuse existing components and tokens before adding a new variant.
- Check a narrow mobile width and a desktop width, and try the main flow with a keyboard.

Avoid oversized rounded cards, heavy shadows, decorative gradients, all-caps navigation, and grids of unrelated accent colors. Do not copy the marketing site's full-screen video hero or large image layout into a task-focused application unless it helps the demo.

## Prompting a new page

> Build a [demo purpose] page using docs/design.md. Reuse AppHeader and the shared UI components. Keep the CD&R typography and palette, use sample data, and make [main action] work locally. Check the layout on mobile and desktop.

When a new pattern is needed, implement the smallest reusable version. Update this guide only when the shared design changes, not for every new screen.
