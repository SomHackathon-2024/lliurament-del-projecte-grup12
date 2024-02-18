// Your HERE API key
const apiKey = 'cbxGKZ9qiCOpEcz7RMhFjRzHLBcoZ34iZvnone5rSH4';

// Initiate and authenticate your connection to the HERE platform
const platform = new H.service.Platform({ 'apikey': apiKey });

const defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map:
let map = new H.Map(
   document.querySelector("#map"),
   defaultLayers.raster.terrain.map, //defaultLayers.raster.satellite.map
   {
      zoom: 10,
      center: { lat: 41.54211, lng: 2.4340 },
      // Add space around the map edges to ensure markers are not cut off:
      padding: { top: 50, right: 50, bottom: 50, left: 50 }
   }
);


/* const map = new H.Map(
   document.querySelector(".map"),
   defaultLayers.raster.terrain.map, //defaultLayers.raster.satellite.map
   {
      zoom: 10,
      center: { lat: 41.54211, lng: 2.4340 },
      // Add space around the map edges to ensure markers are not cut off:
      padding: { top: 50, right: 50, bottom: 50, left: 50 }
   }
); */


/* // MapEvents enables the event system.
// The behavior variable implements default interactions for pan/zoom (also on touch devices).
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); */

// Enable dynamic resizing of the map, based on the current size of the enclosing container
window.addEventListener('resize', () => map.getViewPort().resize());


/* // Obtener la hora actual
const horaActual = new Date().getHours();

// Determinar si es de día o de noche (por ejemplo, de 9:00 a 20:00 consideramos día)
const esDeDia = horaActual >= 9 && horaActual < 20;


fetch('./src/API.json')
   .then(response => {
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response.json();
   })
   .then(data => {
      // Aquí puedes acceder a los datos del JSON y realizar las operaciones necesarias
      console.log(data);
      // Por ejemplo, puedes acceder a los lugares diurnos
      const lugaresDiurnos = data.diurno;
      // O a los lugares nocturnos
      const lugaresNocturnos = data.nocturno;
      
      // Luego puedes usar estos datos para mostrarlos en tu aplicación web, por ejemplo:
      // lugaresDiurnos.forEach(lugar => {
      //   console.log(lugar.nombre);
      //   console.log(lugar.descripcion);
      //   // etc.
      // });

      // lugaresNocturnos.forEach(lugar => {
      //   console.log(lugar.nombre);
      //   console.log(lugar.descripcion);
      //   // etc.
      // });


      // Dependiendo de si es de día o de noche, seleccionar los lugares correspondientes
      const lugares = esDeDia ? data.diurno : data.nocturno;

      // Luego puedes usar los lugares seleccionados para mostrarlos en tu aplicación web, por ejemplo:
      lugares.forEach(lugar => {
      console.log(lugar.nombre);
      });
 */

      // Get an instance of the geocoding service:
      const service = platform.getSearchService();

      const origin = {lat: 41.54365, lng: 2.44445 }
      const destination = { lat: 41.54231, lng: 2.44347 } //Cambiar por los QR

      const waypoints = [ 
         {lat: 41.54696, lng: 2.43227},
         {lat: 41.53473, lng: 2.44231}
      ];
      const waypointMarkers = [];

      // Define the marker style
      const commonSvgStyle = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
         <path d="M24 0C12.955 0 4 9.075 4 20.075C4 28.35 24 48 24 48S44 28.35 44 20.075C44 9.075 35.045 0 24 0Z" fill="${fill}"/>
      </svg>`;

      // Define the fill colors for start, end, and waypoint markers:
      const startFill = 'red';
      const endFill = 'green';
      const waypointFill = 'purple';

      // Create SVG icons for start, end, and waypoint markers using the common style and the corresponding fill color:
      const startIconSvg = commonSvgStyle(startFill);
      const endIconSvg = commonSvgStyle(endFill);
      const waypointIconSvg = commonSvgStyle(waypointFill);


      // Create the parameters for the routing request:
      const routingParameters = {
         'routingMode': 'fast',
         'transportMode': 'pedestrian', // 'car'
         // The start point of the route:
         'origin': `${origin.lat},${origin.lng}`,
         // The end point of the route:
         'destination': `${destination.lat},${destination.lng}`,
         // Include the route shape in the response
         'return': 'polyline',

         // Add a via parameter to the query for each coordinate pair:
         'via': new H.service.Url.MultiValueQueryParameter(
            waypoints.map(wp => `${wp.lat},${wp.lng}`)
         )
      };

      // Define a callback function to process the routing response:
      const onResult = function(result) {
         // Ensure that at least one route was found
         if (result.routes.length) {
            const lineStrings = [];
            result.routes[0].sections.forEach((section) => {
               // Create a linestring to use as a point source for the route line
               lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
            });

            // Create an instance of H.geo.MultiLineString
            const multiLineString = new H.geo.MultiLineString(lineStrings);

            // Create an outline for the route polyline:
            const routeBackground = new H.map.Polyline(multiLineString, {
               style: {
                  lineWidth: 6,
                  strokeColor: 'blue',
                  lineTailCap: 'arrow-tail',
                  lineHeadCap: 'arrow-head'
               }
            });
            // Create a patterned polyline:
            const routeArrows = new H.map.Polyline(multiLineString, {
               style: {
                  lineWidth: 6,
                  fillColor: 'white',
                  strokeColor: 'rgba(255, 255, 255, 1)',
                  lineDash: [0, 2],
                  lineTailCap: 'arrow-tail',
                  lineHeadCap: 'arrow-head' 
               }
            });
            // Create a group that represents the route line and contains
            // Outline and the pattern
            var routeLine = new H.map.Group();
            routeLine.addObjects([routeBackground, routeArrows]);

            // Create a marker for the start point:
            const startMarker = new H.map.Marker(origin, {
               icon: new H.map.Icon(startIconSvg, {
                  size: { w: 32, h: 32 }
               })
            });
            
            // Create waypoint markers:
            waypoints.forEach((waypoint) => {
               const waypointMarker = new H.map.Marker(waypoint, {
                  icon: new H.map.Icon(waypointIconSvg, {
                     size: { w: 28, h: 28 }
                  }),
                  lat: waypoint.lat,
                  lng: waypoint.lng
               });
               // Populate the waypointMarkers array:
               waypointMarkers.push(waypointMarker);
            });

            // Create a marker for the end point:
            const endMarker = new H.map.Marker(destination, {
               icon: new H.map.Icon(endIconSvg, {
                  size: { w: 32, h: 32 }
               })
            });

            // Create a H.map.Group to hold all the map objects and enable us to obtain 
            // the bounding box that contains all its objects within
            const group = new H.map.Group();
            group.addObjects([routeLine, startMarker, endMarker, ...waypointMarkers]);
            // Add the group to the map
            map.addObject(group);

            // Set the map viewport to make the entire route visible:
            map.getViewModel().setLookAtData({
               bounds: group.getBoundingBox()
            });
         };
      };

      // Get an instance of the routing service version 8:
      const router = platform.getRoutingService(null, 8);

      // Call the calculateRoute() method with the routing parameters,
      // the callback, and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult,
         function(error) {
            alert(error.message);
         });

      // MapEvents enables the event system.
      // The behavior variable implements default interactions for pan/zoom (also on mobile touch environments).
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Enable dynamic resizing of the map, based on the current size of the enclosing container
      window.addEventListener('resize', () => map.getViewPort().resize());

      // Marcador estático, sin ruta
      /* // Call the geocode method with the geocoding parameters, the callback and an error callback function (called if a communication error occurs):
      service.geocode({
         at: destination
      }, (result) => {
         // Add a marker for each location found
         result.items.forEach((item) => {
            map.addObject(new H.map.Marker(item.position));
         });
      }, alert) */
   /* })
   .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
   }); */