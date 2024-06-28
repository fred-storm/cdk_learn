const baseUrl = 'https://api.weather.gov/';
    const myLat = 30.379169;
    const myLong = -89.185271;
    //const forecastUrl = baseUrl + '/' + myLat + ',' + myLong;
    async function getEndpoint(lat, long){
            const response = await fetch(
                `${baseUrl}points/${lat},${long}`
            )
            if(!response.ok){
                throw new Error('Fetching endpoint failed');
            }
            //await the response and store data
            const data = await response.json();
            //parse json and grab important parts
            const office = data.properties.cwa;
            const gridx = data.properties.gridX;
            const gridy = data.properties.gridY;
            const forecastUrl = data.properties.forecast
            return forecastUrl;
    };

export const handler = async (event) => {
  const endpoint = getEndpoint(myLat, myLong);
  return endpoint;
};
