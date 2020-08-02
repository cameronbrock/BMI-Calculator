
const express = require('express');

const app = express();
const port_num = 1337;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});
/*
app.get('/style.css', (req, res) => {
	res.sendFile(__dirname + '/style.css');
});
*/
app.listen(port_num, () => {
	console.log('Starting server (port ' + port_num + ')...');
});
