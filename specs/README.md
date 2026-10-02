# DemoBlaze Playwright TypeScript Automation Framework

## Application Overview

This repository contains an end-to-end UI automation framework for the DemoBlaze Product Store: https://www.demoblaze.com. It is built with Playwright Test, TypeScript, and the Page Object Model. The framework covers product discovery, category filtering, product details, cart management, checkout, login, and informational dialogs.

### Key design principles

- Keep tests independent by using a fresh Playwright browser context for every test.
- Use page objects and typed fixtures instead of duplicating selectors and workflows in spec files.
- Prefer accessible roles, labels, stable IDs, and scoped locators.
- Synchronize with Playwright assertions and browser-dialog listeners; do not use arbitrary sleeps.
- Keep generated or stateful test data isolated and avoid committing secrets.

## Setup and installation

### Prerequisites

- Node.js 18 or newer recommended.
- npm available on PATH.
- Internet access to reach DemoBlaze and download Playwright browsers.
- VS Code or another TypeScript-capable editor.

### Install the project

From the repository root (`Blaze`):

```bash
npm install
npx playwright install
```

On Windows PowerShell, run these commands from the integrated terminal. No local application server is required because the tests target the configured DemoBlaze URL.

### Configuration

`tests/config/app.config.ts` reads these optional environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `BASE_URL` | `https://www.demoblaze.com` | Application URL |
| `DEMOBLAZE_USERNAME` | Project fallback value | Login username |
| `DEMOBLAZE_PASSWORD` | Project fallback value | Login password |

Use environment variables for local or CI runs instead of hard-coding credentials. Example PowerShell setup:

```powershell
$env:BASE_URL = 'https://www.demoblaze.com'
$env:DEMOBLAZE_USERNAME = 'your-user'
$env:DEMOBLAZE_PASSWORD = 'your-password'
```

## Execution commands

Run commands from the repository root:

| Command | Description |
|---|---|
| `npm test` | Run the cart, catalog, and checkout suites using the configured projects |
| `npm run test:chromium` | Run the main suites in Chromium only |
| `npm run test:cart` | Run cart tests in Chromium |
| `npm run test:catalog` | Run catalog tests in Chromium |
| `npm run test:checkout` | Run checkout tests in Chromium |
| `npm run test:smoke` | Run tests tagged `@smoke` |
| `npm run test:sanity` | Run tests tagged `@sanity` |
| `npm run test:regression` | Run tests tagged `@regression` |
| `npm run test:ci` | Run the main suites in Chromium with line and HTML reporters |
| `npx playwright test tests/<path>/<file>.spec.ts` | Run one spec file directly |
| `npx playwright test --ui` | Open Playwright UI mode for interactive execution |
| `npx playwright test --project=firefox` | Run against Firefox |

Useful options:

```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --grep "@smoke"
```

The configured projects are Chromium and Firefox. Every environment retries a failed test three times before reporting it as failed. CI uses one worker. Tests collect a trace on the first retry.

## Framework structure

```text
Blaze/
├── package.json                 # npm scripts and dependencies
├── playwright.config.ts        # Playwright projects, retries, reporters, and test directory
├── tsconfig.json                # TypeScript compiler configuration
├── tests/
│   ├── cart/                    # Cart and empty-cart scenarios
│   ├── catalog/                 # Product discovery and authentication scenarios
│   ├── checkout/                # Purchase and checkout validation scenarios
│   ├── config/
│   │   └── app.config.ts        # Base URL and environment-backed credentials
│   ├── fixtures/
│   │   └── test.fixture.ts      # Typed page-object fixtures
│   ├── pages/                   # Page Object Model classes
│   │   ├── home.page.ts
│   │   ├── product.page.ts
│   │   ├── cart.page.ts
│   │   ├── checkout.page.ts
│   │   └── login.page.ts
│   ├── types/                   # Shared TypeScript domain types
│   ├── utils/                   # Reusable dialog and helper utilities
│   ├── example.spec.ts          # Playwright starter example
│   ├── seed.spec.ts             # Seed/setup placeholder
│   └── tag-validation.spec.ts   # Tag validation coverage
├── specs/
│   ├── README.md                # This framework guide
│   └── demoblaze-test-plan.md   # Detailed behavioral test plan
├── playwright-report/           # Generated HTML report output
└── test-results/                # Generated test artifacts
```

### Page objects and fixtures

Page objects in `tests/pages` own locators and reusable user actions. The custom fixture in `tests/fixtures/test.fixture.ts` exposes typed page objects to tests. Add a workflow to the appropriate page object before using it from multiple specs.

### Test organization and tags

Specs are grouped by business capability under `tests/cart`, `tests/catalog`, and `tests/checkout`. Use Playwright tags such as `@smoke`, `@sanity`, and `@regression` to select execution subsets. Keep each test independent and clean up application state when the flow creates persistent data.

## Reports and troubleshooting

The default reporter is HTML. After a run, open the report with:

```bash
npm run report
```

The report is generated under `playwright-report/` and includes test status, steps, errors, and attachments. Raw execution artifacts are stored under `test-results/`. When a retry occurs, the configured trace can be opened from the HTML report to inspect actions, DOM snapshots, and network timing.

For a failed test, rerun the focused spec in headed or debug mode:

```bash
npx playwright test tests/catalog/product-discovery.spec.ts --project=chromium --headed
npx playwright test tests/catalog/product-discovery.spec.ts --project=chromium --debug
```

Do not commit generated reports, traces, screenshots, videos, or credentials unless the repository explicitly requires them.

## Current coverage and limitations

Covered flows include category filtering, product details, adding products to cart, cart totals and deletion, empty-cart checkout, valid purchases, blank checkout rejection, invalid login, signup behavior, and Contact/About Us dialogs. The malformed non-empty checkout validation case remains a known DemoBlaze application limitation and is marked `fixme` until the application rejects invalid card and date values.

## Test Scenarios
