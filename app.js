var map;
$(document).ready(function() { // get location from user
    $('form').submit(function(event) {
        event.preventDefault();
        var street = $(".js_street").val();
        var state = $(".js_state").val();
        var city = $(".js_city").val();
        var userInput = state + '/' + city; // format location info to be used in weather underground
        var totalAddress = '"' + street + ' ' + city + ',' + state + '"';
        console.log(userInput); // location info is displayed correctly 
        $(".results").empty(); // clear out any old results 




        $.ajax({ // feed location into API, get back conditions 
            url: 'https://api.wunderground.com/api/af91e5347e902bf9/conditions/settings/q/' + userInput + '.json',
            dataType: "json",
            method: "GET",
            success: function(data) {
                console.log(data);


                console.log(data.current_observation.temp_f);
                var temperature = data.current_observation.temp_f;
                var weather = data.current_observation.weather;
                var distance = 1000;
                if (temperature < 50 || weather == "raining" || weather == "snowing") {
                    distance = 250;
                }

                $.ajax({
                    url: 'https://arcane-ridge-20214.herokuapp.com/api/search/' + distance + '/' + totalAddress,
                    dataType: "json",
                    method: "GET",
                    success: function(yelpData) {
                        console.log(yelpData);



                        $.each(yelpData.businesses, function(index, business) {
                            $(".results").append("<li><ol>" + business.name + " &#9679; " + business.location.address

                                + " <a href=" + business.url + ">&#9679; Learn More</a>" + "</ol></li>");

                            var locations = { lat: business.location.coordinate.latitude, lng: business.location.coordinate.longitude }; // make this an array of the different locations returned
                            var marker = new google.maps.Marker({
                                position: locations,
                                map: map
                            });


                        });
                    }
                });



            }




        });
    });
});



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 42.3601, lng: -71.0589 },
        zoom: 14
    });

}

// get data back from weather underground 
// if temp_f <45 or raining or snowing, send badWeather search to yelp 
// else, send goodWeather search to Yelp
// how to do two separate calls to yelp? Put right in the if/else statement? 



// display in list + show on map as pins 





/* Yelp info: Consumer Key	o5WlNJkfPxgXNgC9VUvrAQ
Consumer Secret	quI2oBuTlsZdzX544UVhL4YaD6s
Token	KU6chDhw8OWOxkA4hXKDSoJYAav7WWdG
Token Secret	FHXrR-WdLCTXpiKs4vcwhTAduAg

http://api.wunderground.com/api/af91e5347e902bf9/conditions/q/MA/Boston.json

from weather underground, get back the following fields from Conditions: 
temp_f
weather

weather underground key: "af91e5347e902bf9"
Project Name: "Let\'s Walk to Lunch"
*/
