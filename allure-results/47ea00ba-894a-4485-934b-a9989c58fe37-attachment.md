# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search\googlesear.spec.ts >> search google
- Location: tests\search\googlesear.spec.ts:4:5

# Error details

```
Error: locator.fill: Test ended.
Call log:
  - waiting for getByLabel('Search')

```

# Test source

```ts
  1  | // import {expect,test} from '@playwright/test';
  2  | // import {googleConfig} from '../config/google.config';
  3  | import {Page} from '@playwright/test';
  4  | export class GooglePage
  5  | {
  6  |     private searchtextfield;
  7  |     private searchbutton;
  8  | 
  9  |     constructor(private page:Page)
  10 |     {
  11 |         this.searchtextfield=page.getByLabel('Search');
  12 |         //this.searchbutton=page.getByRole('button',{name:'Search'});
  13 |         this.searchbutton=page.locator('button[type="submit"]')
  14 |     }
  15 |     async search(searchtextfield:string)
  16 |     {
> 17 |         await this.searchtextfield.fill(searchtextfield);
     |                                    ^ Error: locator.fill: Test ended.
  18 |         await this.searchbutton.click();
  19 |     }
  20 | 
  21 | }
```