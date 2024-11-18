const { contextBridge, ipcRenderer, shell } = require('electron');
// const https = require('https');

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => shell.openExternal(url),

  getCookies: (url) => ipcRenderer.invoke('get-cookies', url),
  setCookie: (cookie) => ipcRenderer.invoke('set-cookie', cookie),
  removeCookie: (url, name) => ipcRenderer.invoke('remove-cookie', url, name),

  // Fonction pour envoyer des requêtes HTTP au serveur Go
  sendToBackend: async (endpoint, method = 'GET', data = null) => {
    const url = `https://localhost:8080/${endpoint}`;
    let sessionCookie = await ipcRenderer.invoke('get-cookies', 'http://localhost:3000').then((value) => {
      if (value.length === 0) {
        return '';
      }
      return value[0].value
    });
    console.log('Cookie de session :', sessionCookie);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Session-Token': sessionCookie,
      },
      body: data ? JSON.stringify(data) : null,
    };

    try {
      const response = await fetch(url, options);
      console.log('Réponse du backend :', response);
      let data = {};
      if (response.ok === false || response.status !== 200) {
        data = {
          status: response.status,
          ok: response.ok,
          data: null,
        }
      } else {
        const obj = await response.json();
        data = {
          status: response.status,
          ok: response.ok,
          data: obj,
        }
        console.log('Données reçues du backend :', data);
      }
      return data;
    } catch (error) {
      console.error('Erreur de communication avec le backend :', error);
      throw error;
    }
  },

  // Fonction pour établir une connexion WebSocket au serveur Go
  setupWebSocket: () => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onopen = () => {
      console.log("Connexion WebSocket établie");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      ipcRenderer.send('new-message', message);  // Envoie le message au processus principal
    };

    socket.onerror = (error) => {
      console.error("Erreur WebSocket :", error);
    };

    socket.onclose = () => {
      console.log("Connexion WebSocket fermée");
    };

    return socket;
  },

  // Ajout des fonctions `send` et `receive` pour la communication avec le processus principal
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});
