import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    private username: Locator;
    private password: Locator;
    private loginBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.username=page.locator('#loginusername');
        this.password=page.locator('#loginpassword');
        this.loginBtn=page.getByRole('button',{name:'Log in'});

    }

    protected override get readyLocator(): Locator {
        return this.username;
    }

    async loginb(username:string,password:string){
        await this.waitUntilReady();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
