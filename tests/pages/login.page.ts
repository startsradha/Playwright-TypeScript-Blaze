import {Page} from '@playwright/test';
export class LoginPage{
    private username;
    private password;
    private loginBtn;

    constructor(private page:Page){
        this.username=page.locator('#loginusername');
        this.password=page.locator('#loginpassword');
        this.loginBtn=page.getByRole('button',{name:'Log in'});
    } 
    async loginb(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
