

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
		$('#results').fadeOut(fade_time, () => {
			$('#results').fadeIn(fade_time);
		});
	});
	
});

