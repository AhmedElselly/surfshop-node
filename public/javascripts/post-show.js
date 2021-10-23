
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtZWRlbHNlbGx5IiwiYSI6ImNrMmJzdHYzcjA1NnozaXFkZmd3Y2ZwMW8ifQ.wnvBEaISiy6NL_Azp7dH7A';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: post.geometry.coordinates,
    zoom: 5
});

// add markers to map

// create a HTML element for our post location/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
    .setLngLat(post.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
    .addTo(map);

//toggle edit review method
$('.toggle-edit-form').on('click', function(){
    $(this).text() === 'Edit' ? $(this).text('Cancel'): $(this).text('Edit');
    $(this).siblings('.edit-review-form').toggle();
});


// var toggle = document.querySelectorAll(".toggle-edit-form");
// var editForm = document.querySelector('.edit-review-form');


// for(var toggle of toggle){
//     toggle.addEventListener('click', showUp);
// }

// function showUp(e){
//     e.preventDefault();
//     this.innerText = "Cancel";
//     // for(var i = 0; i < editForm.length; i++){
//     //     editForm[i].style.display = "block";
        
//     // }

//     toggle.nextElementSibling.style.display = 'block';
// } 

/*clear rating button*/

$('.clear-rating').click(function(){
    $(this).siblings('.input-no-rate').click();
});

