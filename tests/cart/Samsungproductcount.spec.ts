import {test} from '@playwright/test';
test('count samsung products',async({page})=>{
    await page.goto('https://www.google.com');
    await page.getByRole('combobox',{name:'Search'}).fill('Samsung');
    await page.getByRole('combobox',{name:'Search'}).press('Enter');

    const productSamsung = page.getByText('Samsung', { exact: false });
    //const count = await productSamsung.count();
    //console.log(`number of element containing samsang,${count}`);

    const products =page.locator('.product').filter({hasText:'Samsung'});
    await page.waitForTimeout(5000);
    const count=await products.count();
    console.log(`samsung products,${count}`)
})