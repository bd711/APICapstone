
$(document).ready(function() {       		// get location from user
	$('form').submit(function(event){
		event.preventDefault();
			var street = $(".js_city").val(); 
			var state = $(".js_state").val();
			var city = $(".js_city").val();
			var userInput = state+'/'+city; // format location info to be used in weather underground
		console.log(userInput); // location info is displayed correctly 
		$(".results").empty(); // clear out any old results 




	$.ajax({					// feed location into API, get back conditions 
		data: {
			key = "af91e5347e902bf9",
			query: userInput,
			format: "json",
			features: "conditions",
			//settings: "" //HELP
			},
		url : 
		'http://api.wunderground.com/api/'+key+'/'+features+'/settings/q/'+query+'.'+format, //format url this way?
		//url: "http://api.wunderground.com/api/key/features/settings/q/query.format", or use this? 
	
		dataType: "json",
		//method: "GET",
		success: function(data) {
			console.log(data);
		}
	});


});
});




/*

http://api.wunderground.com/api/af91e5347e902bf9/conditions/q/MA/Boston.json

from weather underground, get back the following fields from Conditions: 
temp_f
weather



weather underground key: "af91e5347e902bf9"
Project Name: "Let\'s Walk to Lunch"

/*

1. Form loads. It knows/gets user's location

2. Trigger search 

3. Connect with weather underground. Send location. 
	Retrieve temperature and precipitation. 

4. If temp <35 degress F, or raining, or snowing {
	search the bad weather criteria
	} else if temp 35 < t < 45 {
	search med weather criteria 
	} else search good weather criteria 

	Bad weather criteria: distance <0.15 miles, price $ or $$, open for lunch, 3+ stars
	Med weather critiera: distance 0.15 - 0.45 miles, price $ or $$, open for lunch, 3+ stars
	Good weather criteria: distance 0.45 miles - 1 mile, price $ or $$, open for lunch, 3+ stars

5. Send weather criteria to yelp 

6. Recieve results back; display in list and on map 
*/