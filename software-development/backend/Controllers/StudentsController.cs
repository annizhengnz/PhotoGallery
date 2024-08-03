using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _repository;

        public StudentsController(IStudentRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            var students = await _repository.GetAllStudentsAsync();
            return Ok(students);
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(long id)
        {
            var student = await _repository.GetStudentByIdAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: api/Students/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(long id, Student student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            try
            {
                await _repository.UpdateStudentAsync(student);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _repository.StudentExistsAsync(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // PUT: api/Students/5/photo_upload
        [HttpPut("{id}/photo_upload")]
        public async Task<IActionResult> PutStudentPhoto(long id, IFormFile File)
        {
            if (File == null || File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // 1. Generate a unique file name
            string fileName = Path.GetRandomFileName() + Path.GetExtension(File.FileName);

            // 2. Determine the upload directory
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            // 3. Ensure the uploads folder exists
            Directory.CreateDirectory(uploadsFolder);

            // 4. Combine the uploads folder path with the unique file name
            string filePath = Path.Combine(uploadsFolder, fileName);

            // 5. Save the file
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await File.CopyToAsync(fileStream);
            }

            // 6. Save the file path to your database
            string dbPath = Path.Combine("uploads", fileName);
            await _repository.UploadPhotoAsync(id, dbPath);

            return Ok(new { filePath = Path.Combine("uploads", fileName) });
        }

        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            await _repository.AddStudentAsync(student);
            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(long id)
        {
            var student = await _repository.GetStudentByIdAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            await _repository.DeleteStudentAsync(id);

            return NoContent();
        }

        // POST: api/Students/bulk
        [HttpPost("bulk")]
        public async Task<ActionResult<IEnumerable<Student>>> BulkCreateStudents(IEnumerable<Student> students)
        {
            if (students == null || !students.Any())
            {
                return BadRequest("Student data is required.");
            }

            await _repository.BulkAddStudentsAsync(students);

            return Ok(students);
        }
    }
}