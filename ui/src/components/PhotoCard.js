import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useMobileDetect from 'use-mobile-detect-hook';
import { BaseConfig } from '../config/AppConfig';
import { WebSocketContext } from '../context/WebSocket';
import { PhotoUpdateModal } from './PhotoUpdateModal';

export function PhotoCard({ albumId, id, title, url, thumbnailUrl, type, description }) {
  const { wsState } = useContext(WebSocketContext);
  const [showModal, setShowModal] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const detectMobile = useMobileDetect();

  const onClickImage = () => {
    if (detectMobile.isMobile()) {
      setShowDescription(!showDescription);
    }
  };
  return (
    <div className="cardContainer" tabIndex={0} role="button" onClick={onClickImage} onKeyDown={onClickImage}>
      <div className={`${type === 'first' ? 'cardInnerFirst' : 'cardInnerNotFirst'}`}>
        <div>
          {(!detectMobile.isMobile() || showDescription) ?
            <img className="cardImg" src={url} alt="BigCo Inc. logo" />

            :
            <div className="cardDescription">{description}</div>
          }
        </div>
        <div className="cardTextContainer">
          <div className="cardTitle">{title}</div>
          {!detectMobile.isMobile() && <div className="cardDescription">{description}</div>}
          <PhotoUpdateModal
            show={showModal}
            onClose={() => { setShowModal(false); }}
            title={`${title} - Update`}
            data={{ albumId, title, id, thumbnailUrl, url }}
          />
          <button
            type="button"
            className="updateBtn btn-primary"
            onClick={() => { setShowModal(true); }}
            disabled={BaseConfig.webSocketState.CLOSED === wsState || BaseConfig.webSocketState.NOTCONNECTED === wsState}
          >
            Update
          </button>
        </div>
      </div>

    </div>
  );
}

PhotoCard.propTypes = {
  albumId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
