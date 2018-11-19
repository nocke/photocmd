const { format } = require('url')

const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const { resolve } = require('app-root-path')

// verify imports do land in the bundle
const banana = require('./banana.js');

app.on('ready', async () => {

  console.log(banana)
  console.log( isDev ? "DEVELOPMENT MODE" : "PRODUCTION MODE")

  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    show: false
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // if (isDev) {
		mainWindow.webContents.openDevTools()
	// }
  })

  const devPath = 'http://localhost:1124'
  const prodPath = format({
    pathname: resolve('dist/app/release/renderer/index.html'),
    protocol: 'file:',
    slashes: true
  })
  const url = isDev ? devPath : prodPath

  mainWindow.setMenu(null)
  mainWindow.loadURL(url)
})

app.on('window-all-closed', app.quit)
