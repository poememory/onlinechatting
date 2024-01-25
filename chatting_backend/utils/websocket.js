// websocket.js
const WebSocket = require('ws');
// 用于存储连接的用户
const clients = new Set();

function setupWebSocket() {
    const wss = new WebSocket.Server({ port: 3001 });
    wss.on('connection', (ws, req) => {
        // 将新连接的 WebSocket 添加到客户端集合中
        console.log(ws+"is on")
        clients.add(ws);

        // 监听消息
        ws.on('message', (message) => {
            // 广播消息给所有连接的客户端
            let data=JSON.parse(message);
            data.date=Date();
            console.log(data)
            broadcast(JSON.stringify(data));
        });

        // 监听关闭事件
        ws.on('close', () => {
            // 从客户端集合中移除关闭的 WebSocket
            clients.delete(ws);
        });
    });

    function broadcast(message) {
        // 遍历所有连接的客户端，发送消息
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

module.exports = setupWebSocket;
