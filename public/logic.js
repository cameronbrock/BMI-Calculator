
const port_num = '1337';

$('document').ready(() => {
	
	var BMI_result = {};
	
	//var socket = io();
	var socket = io.connect();
	socket.on('bmi-result', (result) => {
		//alert('BMI = ' + result.bmi + '\nClassification = ' + result.classification);
		//$('#BMI-val').html(result.bmi);
		//$('#BMI-class').html(result.classification);
		//BMI_result = result;
		$('#results').fadeOut(fade_time, () => {
			$('#BMI-val').html(result.bmi);
			$('#BMI-class').html(result.classification);
			$('#results').fadeIn(fade_time);
		});
		
	});
	
	$('#input-metric').hide();
	$('#results').hide();
	$('#units').html('Imperial');

	// Alter the document according to whether the user specifies
	// metric or imperial units.	
	var fade_time = 200;
	$('#sw1').click(() => {
		if ($('#sw1').prop('checked')) {
			$('#input-imperial').fadeOut(fade_time, () => {
				$('#input-metric').fadeIn(fade_time);
			});
			$('#units').html('Metric');
		}
		else {
			$('#input-metric').fadeOut(fade_time, () => {
				$('#input-imperial').fadeIn(fade_time);
			});
			$('#units').html('Imperial');
		}
	});
	
	// When form is submitted, show the results in the #results div.
	$('#submit-button').click(() => {
		
		// Send post request to server.
		var resp_received = false;
		if ($('#sw1').prop('checked')) {
			var hw_data = {
				unit_sys: 'Metric',
				height_cm: parseFloat( $('#height_metric').val() ),
				weight_kg: parseFloat( $('#weight_metric').val() )
			};
		}
		else {
			var hw_data = {
				unit_sys: 'Imperial',
				height_ft: parseFloat( $('#height_ft_imp').val() ),
				height_in: parseFloat( $('#height_in_imp').val() ),
				weight_lbs: parseFloat( $('#weight_imp').val() )
			};
		}
		
		socket.emit('bmi-submit', hw_data);
		
		/*
		$('#BMI-info').html(post_data.unit_sys);
		
		var post_request = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post_data)
		};
		
		fetch('/', post_request);
		*/
		// Fade out original results and fade in new results.
		/*
		$('#results').fadeOut(fade_time, () => {
			$('#BMI-val').html(BMI_result.bmi);
			$('#BMI-class').html(BMI_result.classification);
			$('#results').fadeIn(fade_time);
		});
		*/
	});
	
	// When exit icon is clicked, remove results.
	$('#exit-button').click(() => {
		$('#results').fadeOut(fade_time);
	});
	
});


