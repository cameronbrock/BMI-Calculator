
/*
$('document').ready(() => {
	$('h1').hide();
});
*/
/*
$('document').ready(() => {
	$('.input-imperial').hide();
});
*/
/*
$('document').ready(() => {
	$('#input-metric').hide();
	$('#submit-button').click(() => {
		//alert('Button has been pressed.');
		$('#input-imperial').hide();
		$('#input-metric').show();
		$('#units').html('Metric');
	});
});
*/
/*
// Check whether switch is toggled to imperial or metric.
$('document').ready(() => {
	$('#input-metric').hide();
	if ($('#sw1').is(':checked')) {
		alert('SW1 is checked.');
		$('#input-imperial').hide();
		$('#input-metric').show();
	}
	
});
*/
/*
$('document').ready(() => {
	if ($('#sw1').prop('checked')) {
		alert('CHECKED.');
	}
	else {
		alert('UNCHECKED.');
	}
});
*/

$('document').ready(() => {
	
	$('#input-metric').hide();
	
	$('#sw1').click(() => {
		if ($('#sw1').prop('checked')) {
			$('#input-imperial').hide();
			$('#input-metric').show();
		}
		else {
			$('#input-imperial').show();
			$('#input-metric').hide();
		}
	});
	
});










