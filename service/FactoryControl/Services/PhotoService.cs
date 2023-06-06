using PhotoControl.Dto;
using PhotoControl.Hub;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using static PhotoControl.Services.PhotosDataService;

namespace PhotoControl.Services
{
    //PhotoService - Photos logic methods
    public interface IPhotosService
    {
        void UpdatePhoto(PhotosDto.Update update);
        void CloseAllSockets();
        void AddAlbum(PhotosDto.AddAlbum addAlbum);
    }

    public class PhotoService : IPhotosService
    {

        WebSocketHub _webSocketHub;
        public PhotoService(WebSocketHub webSocketHub)
        {
            _webSocketHub = webSocketHub;
        }
        public void CloseAllSockets()
        {
            try
            {
                _webSocketHub.CloseAll();
            }
            catch (Exception exp)
            {
                //log exp
            }
        }
        public void UpdatePhoto(PhotosDto.Update update)
        {
            try
            {
                PhotoModel photo = PhotosDataService.Instance.PhotoList.FirstOrDefault(photo => photo.id == update.Id);
                if (photo == null) throw new ArgumentNullException();

                photo.description = update.Message;

                // if a photo updated, send new data to all sockets
                _ = _webSocketHub.SendAll(JsonConvert.SerializeObject(PhotosDataService.Instance.LoadedPhotoList));
            }
            catch (Exception exp)
            {
                //log exp
            }
        }
        public void AddAlbum(PhotosDto.AddAlbum addAlbum)
        {
            try
            {
                List<PhotoModel> photos = PhotosDataService.Instance.PhotoList.FindAll(photo => photo.albumId <= addAlbum.Id);

                if (photos == null) throw new ArgumentNullException();
                PhotosDataService.SetUploadPhotos(photos);

                // if a factory updated, send new data to all sockets
                _ = _webSocketHub.SendAll(JsonConvert.SerializeObject(PhotosDataService.Instance.LoadedPhotoList));
            }
            catch (Exception exp)
            {
                //log exp
            }
        }
    }
}
