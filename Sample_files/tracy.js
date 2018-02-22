const Axios = require('axios');
const baseurl = 'traci.s-apps.de1.bosch-iot-cloud.com'

var traci_key = '';
const auth_data = {
  'im_tid': 'BCX',
  'username': 'bcx-user',
  'password': 'BCX2018!'
};

function get_location(api_key, url){
  return Axios.get('https://'+url+'/api/TRACI/v3/locations', {headers:{
        'Content-Type': 'application/json',
        'Authorization': api_key
     }}).then(function(response) {
           for (i = 0; i < response.data.length; ++i){
             if (response.data[i].name == '100002882007475'){
               var result = {};
               result.id = response.data[i].name;
               result.zone_id = response.data[i].zone_id;
               result.movement_state = response.data[i].data.movement_state;
               result.geo_location = response.data[i].data.geo_location;
               console.log(result);
             }
           }
           return response;
    });
}

function authenticate(auth, url){
    return Axios.post('https://'+url+'/api/v3/authenticate', auth)
        .then((res) => {
            traci_key = res.data.user.api_key;
            return res;
    });
}

Axios.all([authenticate(auth_data, baseurl)])
  .then(Axios.spread(function (acct, perms) {

      Axios.all([get_location(traci_key, baseurl)])
        .then(Axios.spread(function (acct, perms) {

        }));

}));