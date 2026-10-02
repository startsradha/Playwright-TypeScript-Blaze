// import {expect,test} from '@playwright/test';
import {googleConfig} from '../config/google.config';
import {Page,expect} from '@playwright/test';
export class GooglePage
{
    private searchtextfield;
    private samsunglink;

    constructor(private page:Page)
    {
        this.searchtextfield=page.getByRole('combobox',{name:'Search'});
        this.samsunglink=page.getByRole('link',{name:'Samsung India | Mobile | Tablets | TV | Home Appliances'});
    }
    async gotogoogle():Promise<void>
    {
        await this.page.goto(googleConfig.baseUrl);
        await expect(this.searchtextfield).toBeVisible();
    }
    async search(searchtextfield:string)
    {
        await this.searchtextfield.fill(searchtextfield);
        await this.searchtextfield.press('Enter');
    }

    async openSamsungResult():Promise<void>
    {
        await expect(this.samsunglink).toBeVisible();
        await this.samsunglink.click();
    }

}