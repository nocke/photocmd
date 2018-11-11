#!/usr/bin/env node

'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import url from 'url'


console.log( 'Photo UI 234\n' + path.join( __dirname, 'app', 'index.html' ) )

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const createWindow = () => {

	console.log( 'starting ...' )

	win = new BrowserWindow( {
		title: 'egal 12345678',
		width: 800,
		height: 800,

		// HACK, TODO: flexible detection
		x: 3800,
		y: 200

	} )

	// single-Instance snippet __________________________________
	let shouldQuit = app.makeSingleInstance( ( commandLine, workingDirectory ) => {
		// someone tried to run a second instance, restore+focus ours
		if ( win ) {
			if ( win.isMinimized() ) win.restore()
			win.focus()
			win.reload() // eventl. dev TEMP
		}
	} )

	// 2nd window gets this message
	if ( shouldQuit ) {
		app.quit()
		return
	}
	// _________________________________


	// and load the index.html of the app.
	win.loadURL( url.format( {
		pathname: path.join( __dirname, '..', 'app', 'index.html' ),
		protocol: 'file:',
		slashes: true
	} ) )

	// Open the DevTools.
	// DISABLE
	win.webContents.openDevTools()

	// Emitted when the window is closed.
	win.on( 'closed', () => {
		win = null
	} )
} // createWindow

app.on( 'ready', createWindow )

// Quit when all windows are closed.
app.on( 'window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if ( process.platform !== 'darwin' ) {
		app.quit()
	}
} )

app.on( 'activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if ( win === null ) {
		createWindow()
	}
} )


// In main process.
ipcMain.on( 'asynchronous-message', ( event, arg ) => {
	console.log( arg ) // prints "ping"
	event.sender.send( 'asynchronous-reply', 'pong' )
} )

ipcMain.on( 'synchronous-message', ( event, arg ) => {
	console.log( arg ) // prints "ping"
	event.returnValue = 'pong'
} )
