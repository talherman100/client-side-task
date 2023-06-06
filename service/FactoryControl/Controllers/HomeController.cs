using Microsoft.AspNetCore.Mvc;

namespace PhotoControl.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
