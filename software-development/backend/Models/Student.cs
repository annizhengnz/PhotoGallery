namespace Models
{
    public class Student
    {
        public long Id { get; set; }
        public string? Date { get; set; }
        public string? Tag { get; set; }
        public string? Title { get; set; }
        public string? UserID { get; set; }
        //photo file
        public string filepath { get; set; }
    }
}