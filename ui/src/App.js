import './App.css';
import React from 'react';
import { PhotoList } from './components/PhotoList';
import { WebSocketMonitoring } from './components/WebSocketMonitoring';
import { BaseConfig } from './config/AppConfig';
import { WebSocketProvider } from './context/WebSocket';
import { Groups } from './components/Groups';

const photoArray = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
];

function App() {
  return (
    <WebSocketProvider>
      <div className="pageContrainer">
        <div className="container">
          <div className="siteTop">
            <WebSocketMonitoring state={BaseConfig.webSocketState.CLOSED} />

          </div>
          <div className="viewContainer">
            <Groups />
            <PhotoList photoArray={photoArray} />
          </div>
          <div className="siteBottom">Footer</div>
        </div>
      </div>

    </WebSocketProvider>
  );
}

export default App;
