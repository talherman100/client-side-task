import React, { useRef, useContext, useEffect, useState } from 'react';
import useMobileDetect from 'use-mobile-detect-hook';
import { Container } from 'react-bootstrap';
import { PhotoCard } from './PhotoCard';
import { WebSocketContext } from '../context/WebSocket';
import { FactoryService } from '../services/service';

export function PhotoList() {
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
  const [lastAlbum, setLastAlbum] = useState(1);
  const { photoList } = useContext(WebSocketContext);
  const detectMobile = useMobileDetect();
  const listInnerRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      const bottom = document.documentElement.scrollHeight - document.documentElement.scrollTop < 1500;
      if (bottom && !isLoadingAlbum) {
        setIsLoadingAlbum(true);
        FactoryService.AddAlbum({ id: lastAlbum + 1 });
        setLastAlbum(lastAlbum + 1);
        setIsLoadingAlbum(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [photoList]);

  return (
    <div className="">
      <Container>
        {detectMobile.isMobile() ?
          (
            <div className="mobilePhotos">
              <ul className="mobileImageGrid">
                {
                  Array.isArray(photoList) && photoList.length > 2 &&
                  photoList.map((element, index) => (
                    <li key={index}>
                      <PhotoCard albumId={element.albumId} id={element.id} title={element.title} url={element.url} thumbnailUrl={element.thumbnailUrl} description={element.description} type="first" />
                    </li>
                  ))
                }
              </ul>
            </div>
          )
          :
          (
            <div ref={listInnerRef}>
              <ul className="topImagesGrid">
                {
                  Array.isArray(photoList) && photoList.length > 2 &&
                  photoList.slice(0, 3).map((element, index) => (
                    <li key={index}>
                      <PhotoCard albumId={element.albumId} id={element.id} title={element.title} url={element.url} thumbnailUrl={element.thumbnailUrl} description={element.description} type="first" />
                    </li>
                  ))
                }
              </ul>
              <ul className="imagesGrid">
                {
                  Array.isArray(photoList) && photoList.length > 3 &&
                  photoList.slice(3).map((element, index) => (
                    <li key={index}>
                      <PhotoCard albumId={element.albumId} id={element.id} title={element.title} url={element.url} thumbnailUrl={element.thumbnailUrl} description={element.description} type="notfirst" />
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </Container>
    </div>
  );
}
