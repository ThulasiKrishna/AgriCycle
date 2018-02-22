let temperature = document.getElementById('temperature')
let light = document.getElementById('light')
let humidity = document.getElementById('humidity')
let traciLongitude = document.getElementById('traci-longitude').innerHTML
let traciLatitude = document.getElementById('traci-latitude').innerHTML

function updateValues() {
  temperature.innerHTML = randomIntFromInterval(12, 13) + '&deg'
  light.innerHTML = randomIntFromInterval(399, 404)
  humidity.innerHTML = randomIntFromInterval(60, 62) + '%'
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function addStationToMap(map) {
  map.addObject(new H.map.Circle(
    {lat: 52.498380, lng: 13.374522},
    200,
    {
      style: {
        strokeColor: 'rgba(255, 255, 255, 0.5)',
        lineWidth: 2,
        fillColor: 'rgba(201, 233, 129, 0.2)'
      }
    }
  ))
}

function addTraciToMap(map) {
  map.addObject(new H.map.Circle(
    {lat: traciLatitude, lng: traciLongitude},
    7,
    {
      style: {
        strokeColor: 'rgba(255, 255, 255, 0.5)',
        lineWidth: 0,
        fillColor: 'rgba(69, 112, 22, 1)'
      }
    }
  ))
}

let platform = new H.service.Platform({
  app_id: 'lxPEyPQbSTE7HF2sJNuM',
  app_code: 'CwgwqYNDGyV10uy7XwVzSw',
  useCIT: true,
  useHTTPS: true
})

let defaultLayers = platform.createDefaultLayers()

let map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.base, {
    center: {lat: 52.498380, lng: 13.374522},
    zoom: 16
  })

let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

addStationToMap(map)
addTraciToMap(map)

setInterval(updateValues, 1000)
