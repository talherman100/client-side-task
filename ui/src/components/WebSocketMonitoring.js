import React, { useContext } from 'react';
import { BaseConfig } from '../config/AppConfig';
import { WebSocketContext } from '../context/WebSocket';
import { FactoryService } from '../services/service';

export function WebSocketMonitoring() {
  const { wsState, connectWs, closeWs } = useContext(WebSocketContext);
  return (
    <div className="">
      <div className="stickyTop">
        <div className="siteTitle">Nanox</div>
        <div className="topButtons">
          <div className="connectionButtons">
            <button
              type="button"
              className="connectionBtn btn-primary"
              disabled={BaseConfig.webSocketState.CLOSED !== wsState && BaseConfig.webSocketState.NOTCONNECTED !== wsState}
              onClick={() => { connectWs(); }}
            >
              Start Connection
            </button>
            <button
              type="button"
              className="connectionBtn"
              disabled={BaseConfig.webSocketState.OPEN !== wsState}
              onClick={() => { closeWs(); }}
            >
              End Connection
            </button>
            <button
              type="button"
              className="connectionBtn"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={() => { FactoryService.CloseAll(); }}
            >
              End All Connections
            </button>
          </div>
          <div className="connectionBoxContainer">
            {(wsState === BaseConfig.webSocketState.OPEN) ?
              <div className="connectionOpenBox"> </div>
              :
              <div className="connectionCloseBox"> </div>
            }
          </div>
        </div>
      </div>
    </div>

  );
}
