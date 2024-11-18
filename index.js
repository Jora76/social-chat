const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 854,
    minHeight: 480,

    webPreferences: {
      preload: path.join(__dirname, './preload.js'),  // Charger le fichier preload.js
      contextIsolation: true,   // Activer l’isolation de contexte
      nodeIntegration: false,    // Désactiver l'intégration de Node.js pour plus de sécurité
      sandbox: false,            // Désactiver le bac à sable pour pouvoir utiliser des modules Node.js
    }
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file:',
  });
  mainWindow.loadURL(startUrl);

  // Gestion des cookies
  const ses = session.defaultSession;

  ipcMain.handle('get-cookies', async (event, url) => {
    const cookies = await ses.cookies.get({ url });
    return cookies;
  });

  ipcMain.handle('set-cookie', async (event, cookie) => {
    await ses.cookies.set(cookie);
    return 'Cookie set successfully';
  });

  ipcMain.handle('remove-cookie', async (event, url, name) => {
    await ses.cookies.remove(url, name);
    return 'Cookie removed successfully';
  });

  // Menu.setApplicationMenu(null);

  mainWindow.on('closed', () => {
    app.quit();
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  
  // Prevent having error
  event.preventDefault()
  // and continue
  callback(true)

})
