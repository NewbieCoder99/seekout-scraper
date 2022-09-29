// SeekOut
const seekOutLogin = require('./scrapper/app.seekout.io/Login')
const seekOutGetData = require('./scrapper/app.seekout.io/getData')
const seekOutExportData = require('./scrapper/app.seekout.io/exportData')

const args = process.argv.slice(2)

if(args[0] == 'seekout-login') {
    seekOutLogin.index()
    return
}

if(args[0] == 'seekout-get') {
    seekOutGetData.index(args[1],args[2],args[3])
    return
}

if(args[0] == 'seekout-export') {

    /*
    * args[1] = Category
    * args[2] = Prefix File Name
    */
    seekOutExportData.index(args[1], args[2])
    return
}

if(args[0] == 'seekout-reset') {
    seekOutExportData.reset()
    return
}
