
$('document').ready(() => {
	
	var BMI_result = {};
	
	//var socket = io();
	var socket = io.connect();
	socket.on('bmi-result', (result) => {
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
		
		// Send information to server.
		if ($('#sw1').prop('checked')) {
			// If unit system is Metric.
			if ($('#height_metric').val() && $('#weight_metric').val()) {
				// Check if input is numeric.
				if (isNaN(parseFloat($('#height_metric').val())) || isNaN(parseFloat($('#weight_metric').val()))) {
					alert('Please use numeric inputs.');
				}
				else {
					var hw_data = {
						unit_sys: 'Metric',
						height_cm: parseFloat( $('#height_metric').val() ),
						weight_kg: parseFloat( $('#weight_metric').val() )
					};
					socket.emit('bmi-submit', hw_data);
				}
			}
			else {
				alert('Please fill-in all appropriate fields.');
			}
			
		}
		else {
			// If unit system is Imperial.
			if ($('#height_ft_imp').val() && $('#height_in_imp').val() && $('#weight_imp').val()) {
				// Check if input is numeric.
				if (isNaN(parseFloat($('#height_ft_imp').val())) || isNaN(parseFloat($('#height_in_imp').val())) || isNaN(parseFloat($('#weight_imp').val()))) {
					alert('Please use numeric inputs.');
				}
				else {
					var hw_data = {
						unit_sys: 'Imperial',
						height_ft: parseFloat( $('#height_ft_imp').val() ),
						height_in: parseFloat( $('#height_in_imp').val() ),
						weight_lbs: parseFloat( $('#weight_imp').val() )
					};
					socket.emit('bmi-submit', hw_data);
				}
			}
			else {
				alert('Please fill-in all appropriate fields.');
			}
		}
		
		
	});
	
	// When exit icon is clicked, remove results.
	$('#exit-button').click(() => {
		$('#results').fadeOut(fade_time);
	});
	
});


