import Sidebar from '../../components/Sidebar';
import MapComponent from '../../components/MapComponent';
import LineGraph from '../../components/LineGraph';
import Header from '../../components/Header';

const ChartsAndMaps = () => {
  return (
    <>
      <Header headerText={'Charts And Maps'} />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <LineGraph />
          <MapComponent />
        </div>
      </div>
    </>
  );
};

export default ChartsAndMaps;
