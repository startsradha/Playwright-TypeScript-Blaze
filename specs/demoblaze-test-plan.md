# DemoBlaze Product Store Automation Test Plan

## Application Overview

Automate the highest-value DemoBlaze shopping and account journeys with Playwright + TypeScript using Page Object Model classes, app.config.ts environment/configuration, typed fixtures, reusable utilities, and independent test data. Use stable role/label/text locators scoped to dialogs and product/cart rows; rely on URL assertions, locator visibility, expected row counts, alert/dialog handling, and Playwright auto-waiting rather than arbitrary sleeps. Configure the Playwright project with retries: 3 so a failed test is retried at least three times before being reported failed. Suggested framework structure: pages/{home,product,cart,auth,checkout,contact}.page.ts, fixtures/test.fixture.ts, types/{product,checkout,user}.ts, utils/{data,alerts}.ts, tests/{catalog,cart,checkout,auth,content}.spec.ts, app.config.ts, playwright.config.ts, and README.md. Every scenario starts from a fresh browser context and cleans up or uses unique generated account data where state is created.

## Test Scenarios

### 1. Catalog and product discovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Filter catalog by each product category

**File:** `tests/catalog/category-filter.spec.ts`

**Steps:**
  1. Start from a fresh context and navigate to https://www.demoblaze.com/ using HomePage.
    - expect: The home page is loaded and the product grid is visible.
  2. Select Phones, then wait for the product grid to settle using locator visibility/count assertions.
    - expect: Only phone products are displayed and at least one product card is visible.
    - expect: No fixed wait is used; the test synchronizes on product-card locators.
  3. Repeat for Laptops and Monitors from a clean home-page state.
    - expect: Each category displays products belonging to that category and the grid remains usable.
  4. Return to the default catalog.
    - expect: The complete/default product listing is displayed without duplicate or stale cards.

#### 1.2. Open a product and add it to the cart

**File:** `tests/catalog/product-details.spec.ts`

**Steps:**
  1. Start from a fresh context, open the home page, and select a known product by its accessible product name, such as Samsung galaxy s6.
    - expect: The product detail URL contains prod.html and the product name, price, description, and Add to cart control are visible.
  2. Click Add to cart and handle the browser dialog using Playwright dialog synchronization.
    - expect: A success alert confirms the product was added.
  3. Open Cart and inspect the product row.
    - expect: Exactly one row for the selected product is present and its price matches the product detail price.
    - expect: The total equals the selected product price.

#### 1.3. Handle an unavailable or malformed product URL safely

**File:** `tests/catalog/product-edge-cases.spec.ts`

**Steps:**
  1. Start from a fresh context and navigate to a product URL with a missing or invalid id parameter.
    - expect: The application does not crash or expose an unhandled Playwright error.
    - expect: The page remains navigable and shows either an empty/invalid-product state or a safe return path to the store.
  2. Navigate back to the home page.
    - expect: The catalog loads normally after the malformed product request.

### 2. Cart and checkout

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add multiple products, verify total, remove one item, and verify recalculation

**File:** `tests/cart/cart-management.spec.ts`

**Steps:**
  1. Start from a fresh context, add two different products from the catalog, handling each add-to-cart alert.
    - expect: Each add action produces a success alert.
  2. Open Cart and capture the two product rows and their displayed prices.
    - expect: Both selected products appear once and the displayed total equals the sum of their prices.
  3. Delete one product using the delete control scoped to that product row.
    - expect: The deleted row disappears after the DOM-backed assertion.
    - expect: The remaining row is still present and the total recalculates to the remaining product price.
  4. Reload the cart page.
    - expect: The remaining cart state is retained according to the application behavior and no duplicate row is introduced.

#### 2.2. Prevent or safely handle checkout from an empty cart

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Start from a fresh context, navigate directly to cart.html, and assert that no product rows are present.
    - expect: The cart table has no product rows and the total is empty or zero.
  2. Click Place Order.
    - expect: The Place order dialog either remains usable for validation or the application presents a clear no-items response; it must not complete a purchase with no cart items.
  3. Close the dialog and return to the store.
    - expect: The user can recover to the catalog without an error page.

#### 2.3. Complete a purchase with valid checkout data

**File:** `tests/checkout/valid-purchase.spec.ts`
Usename:radhabheemrai24@gmail.com 
Password: Blaze12!@

**Steps:**
  1. Start from a fresh context, add one known product, and open Cart.
    - expect: The cart contains exactly one product and a non-zero total.
  2. Open Place order and fill Name, Country, City, Credit card, Month, and Year with valid representative data using modal-scoped labels.
    - expect: All fields contain the intended values and the Purchase action is enabled/clickable.
  3. Click Purchase and handle the resulting confirmation dialog.
    - expect: A purchase confirmation is displayed with a non-empty order id, amount matching the cart total, and customer name.
    - expect: The confirmation can be dismissed and the flow returns to a usable store/cart state.

#### 2.4. Reject incomplete or invalid checkout data

**File:** `tests/checkout/checkout-validation.spec.ts`

**Steps:**
  1. Start from a fresh context, add one product, open Place order, and leave all fields blank.
    - expect: The purchase attempt is blocked or produces a clear validation/alert response; no success confirmation is shown.
  2. Repeat independently with missing required fields, malformed credit-card text, and non-numeric/invalid month or year values.
    - expect: Invalid submissions never create a purchase confirmation.
    - expect: The checkout dialog remains available for correction or closes only through an explicit user action.

### 3. Authentication and informational dialogs

**Seed:** `tests/seed.spec.ts`

#### 3.1. Reject invalid login credentials

**File:** `tests/auth/invalid-login.spec.ts`

**Steps:**
  1. Start from a fresh context and open the Log in dialog.
    - expect: The login dialog is visible with username, password, and Log in controls.
  2. Submit a clearly nonexistent username and password and handle the browser dialog.
    - expect: The application reports that the user does not exist or otherwise rejects the credentials.
    - expect: The user is not shown as logged in and no Logout control appears.
  3. Submit the login form with blank credentials from a clean dialog state.
    - expect: The application prevents authentication and provides a clear validation/alert response.

#### 3.2. Register a unique user and verify duplicate registration is rejected

**File:** `tests/auth/signup.spec.ts`

**Steps:**
  1. Start from a fresh context and open Sign up.
    - expect: The registration dialog exposes username and password fields and a Sign up action.
  2. Generate a unique username through a utility and submit it with a valid password.
    - expect: A success alert confirms account creation or the application reports the expected registration result.
  3. Submit the exact same username again with the same password.
    - expect: The duplicate registration is rejected with the expected existing-user response.
    - expect: No second account-success response is shown.

#### 3.3. Open and close Contact and About Us dialogs

**File:** `tests/content/information-dialogs.spec.ts`

**Steps:**
  1. Start from a fresh context and open Contact.
    - expect: The Contact dialog is visible with email, name, and message fields plus Send message/Close controls.
  2. Submit Contact with blank fields and handle the resulting dialog.
    - expect: The application gives a clear validation/alert response and does not silently report a successful message.
  3. Close Contact, open About us, then close it.
    - expect: About Us content is visible and both dialogs close cleanly without navigating away from the store.
