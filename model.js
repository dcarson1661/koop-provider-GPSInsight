var sessionToken = null;
var tokenExpirationTime = 0; // Initialize to ensure token is fetched initially
var isFetchingToken = false;

// Function to fetch a new session token
async function fetchSessionToken() {
  if (isFetchingToken) {
    // Another request is already fetching a token, wait for it to complete
    await new Promise((resolve) => {
      const check = () => {
        if (!isFetchingToken) {
          resolve();
        } else {
          setTimeout(check, 100); // Check again after a short delay
        }
      };
      check();
    });
  } else {
    isFetchingToken = true;

    try {
      const userName = 'your username here'
      const appToken = 'your application token here'
      
      const tokenUrl = `https://api.gpsinsight.com/v2/userauth/login?username=${userName}&app_token=${appToken}`;
      const tokenResponse = await fetch(tokenUrl);
      const tokenData = await tokenResponse.json();
      const token = tokenData.data.token;

      // Set token expiration time (adjust as needed)
      const expirationTimeInSeconds = 12 * 60 * 60; // 12 hours

      tokenExpirationTime = Date.now() + expirationTimeInSeconds * 1000;

      sessionToken = token;
      console.log(`new token @: ${new Date(Date.now()).toString()}`)
    } finally {
      isFetchingToken = false;
    }
  }

  return sessionToken;
}

// Function to ensure you have a valid session token
async function ensureSessionToken() {
  if (!sessionToken || Date.now() >= tokenExpirationTime) {
    // Fetch a new token if it doesn't exist or has expired
    await fetchSessionToken();
    
  }
  
  return sessionToken;
}

function Model(koop) {}
Model.prototype.getData = async function(req, callback) {

    //1. fetch New token
    const token = await ensureSessionToken();

    //2. Build url
    const vehiclesUrl = 'https://api.gpsinsight.com/v2/vehicle/location?session_token=' + token
    
    try {
        //3. Make request to gpsInsights
        const response = await fetch(vehiclesUrl)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const json = await response.json()

        //4. Transform Geonames Json to GeoJSON
        var geojson = transformToGeoJSON(json)

        //5. Add metadata to GeoJson
        geojson.metadata = {
            geometryType: 'Point',
            description: 'data'
        }

        //set OBJECTID to match serial_number This is needed as Koop assigns new objectIds from a constantly changing hash
        //which breaks the identify (objectIds query) 
        geojson.features.map(item => {
            item.properties.OBJECTID = item.properties.serial_number
            return item;
        });

        //6. Execute callback
        callback(null, geojson)
    } catch (error) {
        callback(error)
    }

}

function transformToGeoJSON(json) {
    const {data: records} = json
    const features = records.map(transformRecordToFeature)

    return {
        type: 'FeatureCollection',
        features
    }
}

function transformRecordToFeature(record) {

    var {latitude,longitude,...properties} = record

    return {
        type: 'Feature',
        properties,
        geometry: {
            type: 'Point',
            coordinates: [
                longitude,
                latitude
            ]
        }
    }
}

module.exports = Model
