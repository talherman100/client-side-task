/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BaseConfig } from '../config/AppConfig';

const WebSocketContext = React.createContext();
const WebSocketConsumer = WebSocketContext.Consumer;

function WebSocketProvider({ children }) {
  const [wsState, setWsState] = useState(BaseConfig.webSocketState.NOTCONNECTED);
  const [photoList, setPhotoList] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(10);

  const wsRef = useRef();

  // start web socket connection in this function
  const connectWs = () => {
    setWsState(BaseConfig.webSocketState.CONNECTING);
    wsRef.current = new WebSocket(BaseConfig.wsUrl);

    wsRef.current.onopen = () => {
      console.log('socket open');
      setWsState(BaseConfig.webSocketState.OPEN);
    };

    wsRef.current.onmessage = e => {
      console.log('message');
      console.log(e.data);
      setPhotoList(JSON.parse(e.data));
    };

    wsRef.current.onclose = () => {
      console.log('socket closed by server');
      setWsState(BaseConfig.webSocketState.CLOSED);
    };
  };

  const closeWs = () => {
    setCurrentGroup(10);
    wsRef.current.close();
    console.log('socket closed by client');
    setWsState(BaseConfig.webSocketState.CLOSED);
  };

  return (
    <WebSocketContext.Provider value={{ connectWs, closeWs, wsState, photoList, currentGroup }}>
      {children}
    </WebSocketContext.Provider>
  );
}

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { WebSocketContext, WebSocketConsumer, WebSocketProvider };
