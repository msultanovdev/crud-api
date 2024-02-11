import * as http from 'http';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
})
