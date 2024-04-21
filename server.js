const connect = require('connect');
const url = require('url');

function calculate(req, res, next) {
    const query = url.parse(req.url, true).query;
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    let result;
    let operation;

    switch (method) {
        case 'add':
            result = x + y;
            operation = '+';
            break;
        case 'subtract':
            result = x - y;
            operation = '-';
            break;
        case 'multiply':
            result = x * y;
            operation = '*';
            break;
        case 'divide':
            if (y !== 0) {
                result = x / y;
                operation = '/';
            } else {
                res.end('Error: Division by zero');
                return;
            }
            break;
        default:
            res.end('Error: Invalid method');
            return;
    }

    res.end(`${x} ${operation} ${y} = ${result}`);
}

connect()
    .use('/lab2', calculate)
    .listen(3000, () => console.log('Server running on port 3000'));

    