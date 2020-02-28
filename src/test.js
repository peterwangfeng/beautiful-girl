const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.imooc.com/read/46/article/831');
        page.on('load', async () => {
            await page.pdf({path: '22.pdf', format: 'A4'});
            await browser.close();
        })
    } catch (e) {

    }
})();
