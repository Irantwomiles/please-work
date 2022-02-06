const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const is_dev = require('electron-is-dev');
const production_import = path.join(path.dirname(__dirname), "../../node_modules/@truffle/hdwallet-provider/dist/index.js");
const dev_import = '@truffle/hdwallet-provider';
const HDWalletProvider = require(is_dev ? dev_import : production_import);
// const HDWalletProvider = require(dev_import);

console.log("[PATH]", path.dirname(__dirname));
console.log("[PATH_2]", path.join(path.dirname(__dirname), "../../node_modules/@truffle/hdwallet-provider/dist/index.js"));

let mainWindow = null;

const createWindow = () => {
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        resizable: false,
        show: false
    })

    Menu.setApplicationMenu(null);

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    })

    // and load the index.html of the app.
    mainWindow.loadURL(is_dev ? 'http://localhost:3000/' : `file://${path.join(__dirname, "../build/index.html")}`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
