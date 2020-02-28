#!/usr/bin/env node
const puppeteer = require('puppeteer');
const transform = require('./utils')
const argv = process.argv[2]
const fs = require('fs')
const path = process.cwd()
if (!fs.existsSync(`${path}/${argv}`)) {
    fs.mkdirSync(`${path}/${argv}`)
}
;(async () => {
    const browser = await puppeteer.launch({headless: false})
    const newPage = await browser.newPage()
    await newPage.goto('https://image.baidu.com')
    await newPage.setViewport({
        width: 1920,
        height: 3000
    })
    await newPage.focus('#kw')
    await newPage.keyboard.sendCharacter(argv)
    await newPage.click('.s_search')
    newPage.on('load', async () => {
        console.log('page is show')
        const srcs = await newPage.evaluate(() => {
            const image = document.querySelectorAll('.main_img')
            return [...image].map(img => img.src)
        })

        srcs.forEach(async image => {
            await transform(image, argv)
        })
        await browser.close()
    })

})()
