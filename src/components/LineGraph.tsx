import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { TailSpin } from 'react-loader-spinner';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

type CovidData = {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
};
// Fetch data function
const fetchCovidData = async (): Promise<CovidData> => {
  const response = await fetch(
    'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const LineGraph = () => {
  // Use React Query to fetch data
  const { data, error, isLoading } = useQuery<CovidData, Error>(
    ['covidData'],
    fetchCovidData
  );

  // Prepare chart data if fetched
  const chartData = data
    ? {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: 'Cases',
            data: Object.values(data.cases),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
          {
            label: 'Deaths',
            data: Object.values(data.deaths),
            fill: false,
            borderColor: 'rgba(255,99,132,1)',
            tension: 0.1,
          },
          {
            label: 'Recovered',
            data: Object.values(data.recovered),
            fill: false,
            borderColor: 'rgba(54,162,235,1)',
            tension: 0.1,
          },
        ],
      }
    : null;

  // Handle error state
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">
        COVID-19 Cases Over Time
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <TailSpin height="80" width="80" color="blue" ariaLabel="loading" />
        </div>
      ) : (
        <Line
          data={chartData as ChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'COVID-19 Historical Data',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Cases',
                },
              },
            },
          }}
          height={500}
          width={1000}
        />
      )}
    </div>
  );
};

export default LineGraph;
