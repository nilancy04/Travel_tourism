import axios from 'axios';

const API_KEY = 'LJ1nKowgwAF0G33UfCUaAwqADUCfwNd2';
const API_SECRET = '50Sz8SjVvp0ABvE5';
const BASE_URL = 'https://test.api.amadeus.com';

let accessToken = null;

const getAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/security/oauth2/token`, 
      'grant_type=client_credentials&client_id=' + API_KEY + '&client_secret=' + API_SECRET,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('Access Token Response:', response.data);
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Function to autosuggest locations
export const autosuggestLocations = async (query) => {
  if (!accessToken) {
    await getAccessToken();
  }
  try {
    const response = await axios.get(`${BASE_URL}/v1/reference-data/locations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        keyword: query,
        subType: 'AIRPORT,CITY',
        view: 'FULL',
        page: {
          limit: 10
        }
      }
    });

    console.log('API Response:', response.data);
    
    if (response.data && response.data.data) {
      // Filter locations that have IATA codes
      const locations = response.data.data
        .filter(item => item.iataCode)
        .map(item => ({
          name: item.name,
          iataCode: item.iataCode,
          cityName: item.address?.cityName,
          countryName: item.address?.countryName
        }));

      console.log('Processed locations:', locations);
      return locations;
    }
    return [];
  } catch (error) {
    console.error('Error in autosuggest:', error);
    return [];
  }
};

export const searchFlights = async (origin, destination, date) => {
  try {
    if (!accessToken) {
      await getAccessToken();
    }

    console.log('Making flight search API call with:', {
      origin,
      destination,
      date
    });

    const response = await axios.get(`${BASE_URL}/v2/shopping/flight-offers`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: '1',
        currencyCode: 'USD',
        max: 20,
        nonStop: false
      }
    });

    console.log('Flight search API response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('Token expired, refreshing...');
      accessToken = null;
      await getAccessToken();
      return searchFlights(origin, destination, date);
    }
    console.error('Flight search error:', error.response?.data || error);
    throw error;
  }
};