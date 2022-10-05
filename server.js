const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/api/user', userRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})


// // Ecoute des requetes http et reponse
// // Import du package http
// const http = require('http');


// require('./config/db')
// // Import de app pour utilisation de l'application sur le serveur
// const app = require('./app');

// // La fonction normalizePort renvoie un port valide
// const normalizePort = val => {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }
//   if (port >= 0) {
//     return port;
//   }
//   return false;
// };

// // Si aucun port n'est fourni on écoutera sur le port 3000
// const port = normalizePort(process.env.PORT || '3000');
// //Set du port de connection
// app.set('port', port);

// // la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée
// // pour ensuite enregistrée dans le serveur
// const errorHandler = error => {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   const address = server.address();
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges.');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use.');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// Créer un serveur avec express qui utilise app
// création d'une constante pour les appels serveur (requetes et reponses)
// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
//   const address = server.address();
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
//   console.log('Listening on ' + bind);
// });

// // Le serveur écoute le port définit
// server.listen(port);
