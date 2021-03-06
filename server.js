
const express = require('express');
const parser = require('body-parser');
const socketIO = require('socket.io');

const app = express();
const port_num = process.env.PORT || 3000;

var json_parser = parser.json();

app.use(express.static(__dirname + '/public'));
app.use(parser.json());

var  server = app.listen(port_num, () => {
	console.log('Starting server (port = ' + port_num + ')...');
});

var io = socketIO(server);

// Compute the BMI given height, weight, and unit system (Imperial or Metric).
// Height is measured either in inches (Imperial) or centimeters (Metric).
// Weight is measured either in pounds (Imperial) or kilograms (Metric).
function compute_BMI(height, weight, unit_sys) {
	if (unit_sys == 'Imperial') {
		var bmi = (703 * weight) / (height * height);
	}
	else if (unit_sys == 'Metric') {
		var bmi = (10000 * weight) / (height * height);
	}
	else {
		throw new Error(unit_sys + ' is not a valid unit system. Use either \'Imperial\' or \'Metric.\'');
	}
	
	// Round BMI to two decimal places.
	bmi = Math.round(100 * bmi);
	bmi /= 100;
	return bmi;
}

function classify_BMI(bmi) {
	if (bmi < 18.5) {
		return 'Underweight';
	}
	if (bmi < 25) {
		return 'Normal';
	}
	if (bmi < 30) {
		return 'Overweight';
	}
	if (bmi < 40) {
		return 'Obesity';
	}
	return 'Extreme obesity';
}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', (socket) => {

	socket.on('bmi-submit', (hw_data) => {
		
		var unit_sys = hw_data.unit_sys;
		if (unit_sys == 'Imperial') {
			var height = 12 * hw_data.height_ft + hw_data.height_in;
			var weight = hw_data.weight_lbs;			
		}
		else if (unit_sys == 'Metric') {
			var height = hw_data.height_cm;
			var weight = hw_data.weight_kg;
		}
		var BMI = compute_BMI(height, weight, unit_sys);
		var BMI_class = classify_BMI(BMI);
		
		socket.emit('bmi-result', {
			bmi: BMI,
			classification: BMI_class
		});
	});

});

