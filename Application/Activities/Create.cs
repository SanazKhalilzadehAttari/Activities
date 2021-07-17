using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
       public class Command : IRequest<Result<Unit>>{
           public Activity activity{get;set;}
        }
          public class commandValidator : AbstractValidator<Command>
    {
        public commandValidator()
        {
            RuleFor(x=>x.activity).SetValidator(new ActivityValidator());
        }
    }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
              private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                  _context.Activities.Add(request.activity);
                  var result = await _context.SaveChangesAsync()>0;
                  if(!result) return Result<Unit>.Failure("Failed to Create Activity");
                  return Result<Unit>.Sucess(Unit.Value);
                  
            }
        }
      
        } 
    
}