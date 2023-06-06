using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoControl.Dto
{
    public class PhotosDto
    {
        public class Update
        {
            public int Id { get; set; }
            public string Message { get; set; }
        }
        public class AddAlbum
        {
            public int Id { get; set; }
        }
    }
}
