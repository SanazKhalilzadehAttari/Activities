namespace Action.Common.Events
{
    public class CreateUserRejected
    {
        public string Email { get; }
        public string Reason { get; }
        public string Code { get; } 
        protected CreateUserRejected()
        {
            
        } 
        public CreateUserRejected(string email,string reason,string Code)
        {
            Email = email;
            Reason = reason;
            Code = Code;
        }
    }
}