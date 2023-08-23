const express = require('express')
const WebSocket = require('ws')

const wss = new WebSocket.WebSocketServer({ port:3001 })

let clients = []

wss.on('connection', ws => {
	clients.push(ws)
	console.log(`Connected, ${clients.length} users online`)

	ws.on('close', () => {
		clients.splice(clients.indexOf(ws), 1)
		console.log(`Disconnected, ${clients.length} users online`)
	})

	ws.on('message',(event) => {
		const data =  event.toString()
		console.log(data)
		const response = JSON.parse(data)

		if (response.payload && response.payload.rooms) {
			ws.send(JSON.stringify(response.payload.rooms)) 
		}
	})
})


