const button = document.getElementById('button')

const socket = new WebSocket('ws://localhost:3001/')

socket.onopen = () => {
    socket.send(
        JSON.stringify({
            id: 1,
            method: 'connection',
            name: 'Denis',
            age: 32,
        })
    )
}

socket.onmessage = (e) => {
    console.log('С сервера пришло сообщение:', e.data)
}

button.onclick = () => {
    socket.send(
        JSON.stringify({
            id: 1,
            method: 'message',
            name: 'Denis',
            age: 32,
        })
    )
}
