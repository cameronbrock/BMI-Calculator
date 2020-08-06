

$('document').ready(() => {
	
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
		var post_data = {
			unit_sys: 'Imperial',
			height_ft: parseFloat( $('#height_ft_imp').val() ),
			height_in: parseFloat( $('#height_in_imp').val() ),
			weight_lbs: parseFloat( $('#weight_imp').val() )
		};
		$('#BMI-info').html(post_data.unit_sys);
		
		var post_request = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post_data)
		};
		
		fetch('/', post_request);
		
		// Fade out original results and fade in new results.
		$('#results').fadeOut(fade_time, () => {
			$('#results').fadeIn(fade_time);
		});
	});
	
	// When exit icon is clicked, remove results.
	$('#exit-button').click(() => {
		$('#results').fadeOut(fade_time);
	});
	
});


