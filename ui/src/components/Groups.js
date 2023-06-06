import React, { useContext } from 'react';
import { WebSocketContext } from '../context/WebSocket';

export function Groups() {
  const { currentGroup } = useContext(WebSocketContext);

  return (
    <div className="groupsContainer">
      <div className={`groupBox ${currentGroup === 10 ? 'chosenGroupBox' : ''}`}>
        <div className="groupBoxInner">10</div>
      </div>
      <div className={`groupBox ${currentGroup === 20 ? 'chosenGroupBox' : ''}`}>
        <div className="groupBoxInner">20</div>
      </div>
      <div className={`groupBox ${currentGroup === 30 ? 'chosenGroupBox' : ''}`}>
        <div className="groupBoxInner">30</div>
      </div>
      <div className={`groupBox ${currentGroup === 40 ? 'chosenGroupBox' : ''}`}>
        <div className="groupBoxInner">40</div>
      </div>
      <div className={`groupBox ${currentGroup === 50 ? 'chosenGroupBox' : ''}`}>
        <div className="groupBoxInner">50</div>
      </div>
    </div>
  );
}
