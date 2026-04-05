import http from 'http';
import { todos } from './data.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Server is running</h1>');
    } 
    else if (url.pathname === '/api/v1/todoItem' && req.method === 'GET') {
        const variantData = todos.filter(item => item.id === 12 || item.userId === 12); 
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(variantData));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});