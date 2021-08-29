namespace Action.Common.Events
{
    public interface IAuthenticateEvent:IEvent
    {
        Guid UserID {get;set;}
    }
}