const { contextBridge, ipcRenderer, shell } = require('electron');
// const https = require('https');
let socket;

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => shell.openExternal(url),

  getCookies: (url) => ipcRenderer.invoke('get-cookies', url),
  setCookie: (cookie) => ipcRenderer.invoke('set-cookie', cookie),
  removeCookie: (url, name) => ipcRenderer.invoke('remove-cookie', url, name),

  // Fonction pour envoyer des requêtes HTTP au serveur Go
  sendToBackend: async (endpoint, method = 'GET', data = null) => {
    // console.log('Envoi de la requête au backend :', endpoint, method, data);
    const url = `https://localhost:8080/${endpoint}`;
    let sessionCookie = await ipcRenderer.invoke('get-cookies', 'http://localhost:3000').then((value) => {
      if (value.length === 0) {
        return '';
      }
      return value[0].value
    });
    // console.log('Cookie de session :', sessionCookie);
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
      // console.log('Réponse du backend :', response);
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
        // console.log('Données reçues du backend :', data);
      }
      return data;
    } catch (error) {
      console.error('Erreur de communication avec le backend :', error);
      throw error;
    }
  },

  // Fonction pour établir une connexion WebSocket au serveur Go
  setupWebSocket: async (updateMessages, setSocketOpen) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return socket;
    }
    socket = new WebSocket('wss://localhost:8080/api/ws/user');
    let sessionCookie = await ipcRenderer.invoke('get-cookies', 'http://localhost:3000').then((value) => {
      if (value.length === 0) {
        return '';
      }
      return value[0].value
    });
    socket.onopen = () => {
      console.log("Connexion WebSocket établie");
      const initWsObject = {
        type: "init",
        sender_uuid: sessionCookie,
      };
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(initWsObject))
        setSocketOpen(true);
      }
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message reçu :', message);
      updateMessages(message);
    };

    socket.onclose = () => {
      console.log("Connexion WebSocket fermée");
      setSocketOpen(false);
    };

    return socket;
  },

  sendMessage: (message) => {
    // socket.send(JSON.stringify(message));
    console.log('Message envoyé :', message);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket n'est pas ouvert");
    }
  },
});
