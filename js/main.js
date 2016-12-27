
function initMap() {
	

	if (navigator.geolocation) {
		
		
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat : position.coords.latitude,
				long : position.coords.longitude
			};
			var mylocation = new google.maps.LatLng(pos.lat, pos.long);

			var map = new google.maps.Map(document.getElementById('map'), {
				center : mylocation,
				zoom : 15
			});

			
			// Specify location, radius and place types for your Places API
			// search.
			var request = {
				location : new google.maps.LatLng(pos.lat, pos.long),
				radius : '10000',
				types : [ 'gas_station' ]
			};

			// Create the PlaceService and send the request.
			// Handle the callback with an anonymous function.
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, function(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					var image;
					var infowindow = new google.maps.InfoWindow();
					for (var i = 0; i < results.length; i++) {
						var place = results[i];
						
						 $.ajax({
		 						type : "GET",
		 						url : "php/useraction.php?action=searchimage&name=" + results[i].name,
		 						success : function(ans) {
		 							
		 							
		 							image = ans;
		 							
		 					
		 							
		 						},
		 						async:false
		 					});
						

						 imageurl = 'images/'+image;
						var beachMarker = new google.maps.Marker({
							position : place.geometry.location,
							map : map,
							icon : imageurl,
							clickable:true
						});

						
						google.maps.event.addListener(beachMarker, 'click', (function (beachMarker, i) {
			                return function () {
			                	var fuel_avail;
			                	var diesel_avail;
			                	var fuelp;
			                	var dieselp;
			                	//---
			                	
			                	
			                	 $.ajax({
			 						type : "GET",
			 						url : "php/useraction.php?action=search&name=" + results[i].name,
			 						success : function(ans) {
			 							//alert(results[i].name);
			 							var returnedData = JSON.parse(ans);
			 							
			 								fuelp = returnedData[0].fuel_price;
			 								dieselp = returnedData[0].diesel_price;
			 								fuel_avail = returnedData[0].fuel_avail;
			 								diesel_avail = returnedData[0].diesel_avail;
			 								
			 								
			 								
			 								//alert(results[i].name);
			 								infowindow.setContent(results[i].name + "</br> fuel price:"+fuelp + " </br>fuel availability: "+ fuel_avail+ " </br>Diesel price: "+ dieselp+ " </br>diesel availability: "+ diesel_avail + "</br><button onclick = 'showmore()'> more </button");                      
						                    infowindow.open(map, beachMarker);
			 							
			 						}
			 					});
			                	 
			                	// ;
			                	// ---
			                    
			                }
			            })(beachMarker, i)); 
						
						

						
					}
				}
			});

		}, function() {
			handleLocationError(true);
		});
		
	} else {
		
//		var map = new google.maps.Map(document.getElementById('map'), {
//			center : new google.maps.LatLng(9.108530, 7.483057),
//			zoom : 15
//		});
//		
		
		
		
		// Browser doesn't support Geolocation
		handleLocationError(false);
	}

}

function showPosition(position) {
	lat = position.coords.latitude;
	long = position.coords.longitude;
}

function handleLocationError(browserHasGeolocation) {

}
function getlocation() {

}

