
const express = require('express');
const parser = require('body-parser');

const app = express();
const port_num = 1337;

var json_parser = parser.json();

app.use(express.static(__dirname + '/public'));
app.use(parser.json());

// Compute the BMI given height, weight, and unit system (Imperial or Metric).
// Height is measured either in inches (Imperial) or centimeters (Metric).
// Weight is measured either in pounds (Imperial) or kilograms (Metric).
function compute_BMI(height, weight, unit_sys) {
	if (unit_sys == 'Imperial') {
		return (703 * weight) / (height * height);
	}
	else if (unit_sys == 'Metric') {
		return (10000 * weight) / (height * height);
	}
	else {
		throw new Error(unit_sys + ' is not a valid unit system. Use either \'Imperial\' or \'Metric.\'');
	}
}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/', json_parser, (req, res) => {
	// TEST
	console.log('TEST');
	//console.log('Request = ' + req.body.unit_sys);
	console.log('Request = ' + JSON.stringify(req.body));
	
	var unit_sys = req.body.unit_sys;
	if (unit_sys == 'Imperial') {
		
		console.log('Freedom units detected.');
		
		var height = 12 * req.body.height_ft + req.body.height_in;
		var weight = req.body.weight_lbs;
		
		var BMI = compute_BMI(height, weight, unit_sys);
		console.log('Height = ' + height + '\nWeight = ' + weight);
		console.log('Computed BMI = ' + BMI);
		
	}
	else if (unit_sys == 'Metric') {
		
		console.log('Commie units detected.');
		
		var height = req.body.height_cm;
		var weight = req.body.weight_kg;
		
		var BMI = compute_BMI(height, weight, unit_sys);
		console.log('Computed BMI = ' + BMI);
	}
});

app.listen(port_num, () => {
	console.log('Starting server (port = ' + port_num + ')...');
});
