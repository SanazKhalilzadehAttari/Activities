namespace Action.Common.Events
{
    public class UserCreated: IEvent
    {
        public string Emai { get;}
        public string Name { get;}

        protected UserCreated()
        {
            
        }
        public UserCreated(string Emai,string name)
        {
            Emai = Emai;
            name=Name;
        }
    }
}