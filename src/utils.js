// url -> image
/**
 * @desc
 * @type {module:http}
 */
const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile)
const pp = process.cwd()
const url2img = async (src, dir) => {
    const mod = /^https:/.test(src) ? https : http
    mod.get(src, res => {
        res.pipe(fs.createWriteStream(pp + '/' + dir + '/' + Date.now() + path.extname(src)))
        res.on('end', () => {
            console.log('success')
        });
    })
}
/**
 *
 * @param base64str
 * @param dir
 * @returns {Promise<void>}
 */
const b64toImg = async (base64str, dir) => {
    try {
        const matches = base64str.match(/^data:(.+?);base64,(.+)$/)
        const extname = matches[1].split('/')[1].replace('jpeg', 'jpg')
        const content = matches[2]
        await writeFile(pp + '/' + dir + '/' + Date.now() + '.' + extname, content, 'base64')
        console.log(`${extname} is success`)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = async function (src, dir) {
    if (/data:/.test(src)) {
        await b64toImg(src, dir)
    } else {
        await url2img(src, dir)
    }
}
