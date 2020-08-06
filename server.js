
const express = require('express');
const parser = require('body-parser');

const app = express();
const port_num = 1337;

var json_parser = parser.json();

app.use(express.static(__dirname + '/public'));
app.use(parser.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/', json_parser, (req, res) => {
	// TEST
	console.log('TEST');
	//console.log('Request = ' + req.body.unit_sys);
	console.log('Request = ' + JSON.stringify(req.body));
	if (req.body.unit_sys == 'Imperial') {
		console.log('Freedom units detected.');
	}
});

app.listen(port_num, () => {
	console.log('Starting server (port ' + port_num + ')...');
});
