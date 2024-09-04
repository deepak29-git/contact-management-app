import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import { TailSpin } from 'react-loader-spinner';

// Fix Leaflet's default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
type CountryInfo = {
  lat: number;
  long: number;
  iso2: string;
};
type CountryData = {
  country: string;
  active: string;
  recovered: string;
  deaths: string;
  countryInfo: CountryInfo;
}[];
// Function to fetch COVID-19 data for countries
const fetchCountryData = async (): Promise<CountryData> => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const MapComponent = () => {
  // Use useQuery hook to fetch country data
  const {
    data: countryData,
    error,
    isLoading,
  } = useQuery<CountryData, Error>(['countryData'], fetchCountryData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TailSpin height="80" width="80" color="blue" ariaLabel="loading" />
      </div>
    );
  }
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countryData.map((country) => (
        <Marker
          key={country.countryInfo.iso2}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <div>
              <h3>{country.country}</h3>
              <p>
                <strong>Active Cases:</strong> {country.active.toLocaleString()}
              </p>
              <p>
                <strong>Recovered Cases:</strong>{' '}
                {country.recovered.toLocaleString()}
              </p>
              <p>
                <strong>Deaths:</strong> {country.deaths.toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
