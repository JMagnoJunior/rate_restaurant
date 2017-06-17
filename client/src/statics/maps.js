
        
var map;
var service;
var infowindow;
var geocoder;
var myposition;

function initialize(position) {
                         
    if(position){
        myposition = position;                    
    }else{
        myposition = new google.maps.LatLng(-33.8665433,151.1956316);
    }
    
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById('map'), {
        center: myposition,
        zoom: 15
        });

    var request = {
        location: myposition,
        radius: '500',
        query: 'restaurant'
    };
    
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status) {
    $('#loadmsg').addClass("hide");
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var marker = new google.maps.Marker({
                position: results[i].geometry.location,
                label: results[i].name,
                map: map
            });
            marker.place = place
            marker.addListener('click', function() {
                
                $("#name_restaurant").html(this.place.name)
                $("#id_restaurant").val(this.place.id)
                $("#id_restaurant").change()
            });

        }
    }
}
// it only will be used if theres no browser support for geo
function rerenderMap(){
    
    geocoder.geocode({ 'address': $("#location").val() + ', Brasil', 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            var request = {
                location: results[0].geometry.location,
                radius: '500',
                query: 'restaurant'
            };

            map = new google.maps.Map(document.getElementById('map'), {
                center: results[0].geometry.location,
                zoom: 15
            });

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
                
            }
        });
}

$(document).ready(function () {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function Latlng(pos){
                myposition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                initialize(myposition);
        });
    }else{
        initialize(null);
        $('#setAddress').removeClass("hide");
    } 
                
});
    
