namespace Action.Common.Events
{
    public class IRejectedEvent:IEvent
    {
        string Reason {get;}
        string Code {get;}
    }
}