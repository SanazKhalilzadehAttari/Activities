namespace Action.Common.Events
{
    public class UserIdenticated
    {
        public string Email { get; }
    }
    protected UserIdenticated()
    {
        
    }
    public UserIdenticated(string email)
    {
        Email = email;      
    }
}