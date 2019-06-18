const fs = require('fs')
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write(`
        <body>
         <form action="/message" method="POST">
         <input type="text" name="sid" />
         <button type="submit">Send</button>
         </form>
         </body>`)
        res.write('</html>')
        return res.end();
    }
    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            const message = parsedBody.split('=')[0];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            });

        });

    }
    else {
        res.setHeader('content-type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Budddy page</title></head>')
        res.write('<body><h1>Hello there buddy</h1></body>')
        res.write('</html>')
        res.end();
    }
}
module.exports = requestHandler;