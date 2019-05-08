$(document).ready(function(){

	var myVar = setInterval(myTimer, 3000);

	
	
	

});


function myTimer() {
	$.get('http://www.medcongress.com.mx/getImg',{
	}, function(response){
		var image = new Image();
		console.log(response);
		image.src = response;
		$( "img" ).remove();
		$('#card').append(image);
		$('img').addClass("card-img");
	});
}