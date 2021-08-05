using System;

namespace Application.Core
{
    public class AppExceptions: Exception
    {
        public AppExceptions(int statusCode, string Message ,string details = null)
        {
            this.StatusCode = statusCode;
            this.Details = details;
            this.Message = Message;

        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

    }
}