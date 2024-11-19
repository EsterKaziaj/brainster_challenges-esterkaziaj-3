import React from 'react';
import Banner from './components/Banner';
import DetailsBlock from './components/DetailsBlock';
import PlacesContainer from './components/PlacesContainer';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Banner />
      <DetailsBlock
        title="Stories of Adventure"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere ratione nostrum ea obcaecati suscipit quia magnam!"
        imageUrl="https://picsum.photos/300/300"
      />
      <PlacesContainer />
      <DetailsBlock
        title="Popular Adventures"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere ratione nostrum ea obcaecati suscipit quia magnam!"
        imageUrl="https://picsum.photos/300/300"
      />
      <Footer />
    </div>
  );
};

export default App;
