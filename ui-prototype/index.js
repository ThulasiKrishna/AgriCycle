const request = require('request')
const Axios = require('axios')
const express = require('express')
const app = express()

let result = {}

const baseurl = 'traci.s-apps.de1.bosch-iot-cloud.com'

let traci_key = ''

const auth_data = {
  'im_tid': 'BCX',
  'username': 'bcx-user',
  'password': 'BCX2018!'
}

function get_location(api_key, url) {
  return Axios.get('https://' + url + '/api/TRACI/v3/locations', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': api_key
    }
  }).then(function(response) {
    for (i = 0; i < response.data.length; ++i) {
      if (response.data[i].name == '100002882007475') {
        result.id = response.data[i].name
        result.zone_id = response.data[i].zone_id
        result.movement_state = response.data[i].data.movement_state
        result.geo_location = response.data[i].data.geo_location
        console.log(result)
      }
    }
    return response;
  })
}

function authenticate(auth, url) {
  return Axios.post('https://' + url + '/api/v3/authenticate', auth)
    .then((res) => {
      traci_key = res.data.user.api_key
      return res
    })
}

Axios.all([authenticate(auth_data, baseurl)])
  .then(Axios.spread(function(acct, perms) {
    Axios.all([get_location(traci_key, baseurl)])
      .then(Axios.spread(function(acct, perms) {
      }))
  }))

let device_name, device_owner, device_uuid

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('app', {
    longitude: result.geo_location.longitude,
    latitude: result.geo_location.latitude,
  })
  console.log(get_location())
})

app.listen(4000)
