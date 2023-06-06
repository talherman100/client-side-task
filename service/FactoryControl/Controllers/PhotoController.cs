using PhotoControl.Dto;
using PhotoControl.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace PhotoControl.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhotoController : ControllerBase
    {
        private IPhotosService _photosService;

        public PhotoController(IPhotosService photosService)
        {
            _photosService = photosService;
        }

        [HttpPost("Update")]
        public IActionResult Update(PhotosDto.Update update)
        {
            try
            {
                _photosService.UpdatePhoto(update);
                return Ok();
            }
            catch (Exception exp)
            {
                return BadRequest();
            }
        }
        [HttpPost("AddAlbum")]
        public IActionResult AddAlbum(PhotosDto.AddAlbum addAlbum)
        {
            try
            {
                _photosService.AddAlbum(addAlbum);
                return Ok();
            }
            catch (Exception exp)
            {
                return BadRequest();
            }
        }
        [HttpGet("CloseAllSockets")]
        public IActionResult CloseAllSockets()
        {
            try
            {
                _photosService.CloseAllSockets();
                return Ok();
            }
            catch (Exception exp)
            {
                return BadRequest();
            }
        }
    }
}
