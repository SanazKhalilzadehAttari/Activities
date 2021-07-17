using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Activity activity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public class commandValidator : AbstractValidator<Command>
    {
        public commandValidator()
        {
            RuleFor(x=>x.activity).SetValidator(new ActivityValidator());
        }
    }
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _context.Activities.Find(request.activity.Id);
               _mapper.Map(request.activity,activity);
               var result = await _context.SaveChangesAsync()>0;
                if(!result) return Result<Unit>.Failure("Faild to Update Activity");
               return Result<Unit>.Sucess(Unit.Value);
            }
        }
    }
}