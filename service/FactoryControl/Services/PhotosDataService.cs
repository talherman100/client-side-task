using System.Collections.Generic;
using System.Net;

namespace PhotoControl.Services
{
    //Singleton for photos data
    //On creation fetch all data from API_DOMAIN
    public sealed class PhotosDataService
    {
        public List<PhotoModel> PhotoList = null;
        public List<PhotoModel> LoadedPhotoList = null;
        private static string API_DOMAIN = "https://jsonplaceholder.typicode.com/photos";
        private PhotosDataService() {
            using (WebClient wc = new WebClient())
            {
                string jsonString = wc.DownloadString(API_DOMAIN);
                PhotoList = System.Text.Json.JsonSerializer.Deserialize<List<PhotoModel>>(jsonString);
                LoadedPhotoList = PhotoList.FindAll(photo => photo.albumId == 1);
            }
        }
        private static PhotosDataService instance = null;
        public static PhotosDataService Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new PhotosDataService();
                }
                return instance;
            }
        }
        public static void SetUploadPhotos(List<PhotoModel> _loadPhotoList) {
            lock (PhotosDataService.instance.LoadedPhotoList)
            {
                PhotosDataService.instance.LoadedPhotoList = _loadPhotoList;
            }
            
        }

        public class PhotoModel
        {
            public int albumId { get; set; }
            public int id { get; set; }
            public string title { get; set; }
            public string url { get; set; }
            public string thumbnailUrl { get; set; }
            public string description { get; set; } = string.Empty;

        }
    }
}
