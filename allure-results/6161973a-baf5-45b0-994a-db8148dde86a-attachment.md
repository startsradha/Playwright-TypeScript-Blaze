# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search\googlesear.spec.ts >> search google
- Location: tests\search\googlesear.spec.ts:4:5

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://www.google.com/", waiting until "load"

```

# Test source

```ts
  1  | // import {expect,test} from '@playwright/test';
  2  | import {googleConfig} from '../config/google.config';
  3  | import {Page,expect} from '@playwright/test';
  4  | export class GooglePage
  5  | {
  6  |     private searchtextfield;
  7  |     private searchbutton;
  8  |     private samsunglink;
  9  | 
  10 |     constructor(private page:Page)
  11 |     {
  12 |         this.searchtextfield=page.getByLabel('Search');
  13 |         //this.searchbutton=page.getByRole('button',{name:'Search'});
  14 |         this.searchbutton=page.locator('button[type="submit"]')
  15 |         this.samsunglink=page.getByRole('link',{name:'Samsung India | Mobile | Tablets | TV | Home Appliances'});
  16 |     }
  17 |     async gotogoogle():Promise<void>
  18 |     {
> 19 |         await this.page.goto(googleConfig.baseUrl);
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  20 |         await expect(this.searchtextfield).toBeVisible();
  21 |     }
  22 |     async search(searchtextfield:string)
  23 |     {
  24 |         await this.searchtextfield.fill(searchtextfield);
  25 |         await this.searchbutton.click();
  26 |         await this.samsunglink.click();
  27 |     }
  28 | 
  29 | }
```