#!/usr/bin/env node
import http from 'http'
import app from '../app.js'

// obtain port
var port = normalizePort(process.env.PORT || 8080)
app.set('port', port)

// create server
const server = http.createServer(app)
// server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

process.on('SIGINT', async () => {
  console.log("Closing server");
  server.close()
  process.exit()
})


// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

//Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  console.log(`http://localhost:${port}`)
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}