# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search\googlesear.spec.ts >> search google
- Location: tests\search\googlesear.spec.ts:4:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel('Search')
Expected: visible
Error: strict mode violation: getByLabel('Search') resolved to 5 elements:
    1) <a class="gb_6" data-pid="2" target="_top" aria-label="Search for Images " href="https://www.google.com/imghp?hl=en&ogbl">Images</a> aka getByRole('link', { name: 'Search for Images' })
    2) <textarea name="q" rows="1" id="ti6dpd" autofocus="" class="gLFyf" placeholder="" jsname="yZiJbe" role="combobox" maxlength="2048" autocorrect="off" aria-owns="Alh6id" autocomplete="off" spellcheck="false" aria-label="Search" autocapitalize="off" aria-expanded="false" aria-haspopup="false" aria-controls="Alh6id" aria-autocomplete="both" data-ved="0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q39UDCBE"></textarea> aka getByRole('combobox', { name: 'Search' })
    3) <div data-hp="1" tabindex="0" role="button" class="fzj3ad" jsname="F7uqIe" jscontroller="unV4T" aria-label="Search by voice" data-ved="0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Qvs8DCBI" jsaction="h5M12e;rcuQ6b:npT2md;KHxBOb:EANhx;HINvVc:OUwavc;hATt5e:AkD3se;CQJmec:efDZmf">…</div> aka getByRole('button', { name: 'Search by voice' })
    4) <div tabindex="0" role="button" jsname="R5mgy" class="etxtjc" jscontroller="lpsUAf" data-is-images-mode="false" aria-label="Search by image" jsaction="rcuQ6b:npT2md;h5M12e;AMruCe:Zpug7c" data-ved="0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0QhqEICBM">…</div> aka getByRole('button', { name: 'Search by image' })
    5) <input name="btnK" tabindex="0" role="button" type="submit" class="gNO89b" value="Google Search" aria-label="Google Search" data-ved="0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q4dUDCB0"/> aka getByLabel('Google Search')

Call log:
  - Expect "toBeVisible" getByLabel('Search') with timeout 5000ms
  - waiting for getByLabel('Search')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - link "About" [ref=e4] [cursor=pointer]:
      - /url: https://about.google/?fg=1&utm_source=google-IN&utm_medium=referral&utm_campaign=hp-header
    - link "Store" [ref=e5] [cursor=pointer]:
      - /url: https://store.google.com/IN?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=en-IN
    - generic [ref=e7]:
      - generic [ref=e8]:
        - link "Gmail" [ref=e10] [cursor=pointer]:
          - /url: https://mail.google.com/mail/&ogbl
        - link "Search for Images" [ref=e12] [cursor=pointer]:
          - /url: https://www.google.com/imghp?hl=en&ogbl
          - text: Images
      - button "Google apps" [ref=e15] [cursor=pointer]
      - link "Sign in" [ref=e20] [cursor=pointer]:
        - /url: https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=futura_exp_og_so_72776762_e
  - img "Google" [ref=e24]
  - search [ref=e32]:
    - generic [ref=e34]:
      - generic [ref=e36]:
        - button "Add files and tools" [ref=e41] [cursor=pointer]
        - combobox "Search" [active] [ref=e46]
        - generic [ref=e47]:
          - generic [ref=e48]:
            - button "Search by voice" [ref=e51] [cursor=pointer]
            - button "Search by image" [ref=e56] [cursor=pointer]
          - link "AI Mode" [ref=e59] [cursor=pointer]
      - generic [ref=e68]:
        - button "Create images" [ref=e69] [cursor=pointer]:
          - generic [aria-hidden] [ref=e70]: 🍌
        - button "Ask about files" [ref=e72] [cursor=pointer]
        - button "Brainstorm" [ref=e77] [cursor=pointer]
        - button "I am feeling lucky" [ref=e82] [cursor=pointer]
  - generic [ref=e86]:
    - text: "Google offered in:"
    - link "हिन्दी" [ref=e87] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=hi&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCCk
    - link "বাংলা" [ref=e88] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=bn&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCCo
    - link "తెలుగు" [ref=e89] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=te&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCCs
    - link "मराठी" [ref=e90] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=mr&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCCw
    - link "தமிழ்" [ref=e91] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=ta&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCC0
    - link "ગુજરાતી" [ref=e92] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=gu&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCC4
    - link "ಕನ್ನಡ" [ref=e93] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=kn&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCC8
    - link "മലയാളം" [ref=e94] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=ml&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCDA
    - link "ਪੰਜਾਬੀ" [ref=e95] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_70eiBnakbOiE2OQM5pG63OS6Ox8%3D&hl=pa&source=homepage&sa=X&ved=0ahUKEwiH666-25qXAxXR8zgGHdQ_Jj0Q2ZgBCDE
  - contentinfo [ref=e97]:
    - generic [ref=e98]: India
    - generic [ref=e99]:
      - generic [ref=e100]:
        - link "Advertising" [ref=e101] [cursor=pointer]:
          - /url: https://www.google.com/intl/en_in/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1
        - link "Business" [ref=e102] [cursor=pointer]:
          - /url: https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1
        - link "How Search works" [ref=e103] [cursor=pointer]:
          - /url: https://google.com/search/howsearchworks/?fg=1
      - generic [ref=e104]:
        - link "Privacy" [ref=e105] [cursor=pointer]:
          - /url: https://policies.google.com/privacy?hl=en-IN&fg=1
        - link "Terms" [ref=e106] [cursor=pointer]:
          - /url: https://policies.google.com/terms?hl=en-IN&fg=1
        - button "Settings" [ref=e110] [cursor=pointer]
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
  19 |         await this.page.goto(googleConfig.baseUrl);
> 20 |         await expect(this.searchtextfield).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
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