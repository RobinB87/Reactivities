using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        // Commands do not return anything.
        // Hence no type parameter is used for IRequest
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            // Even though commands do not return anything, this is still returning a Task of type Unit
            // This is just an object that MediatR provides, but it does not have any real value.
            // It is like returning nothing, but it tells the API that the request is finished, so it can move on.
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                return await _context.SaveChangesAsync() > 0
                    ? Result<Unit>.Success(Unit.Value) 
                    : Result<Unit>.Failure("Failed to create activity");
            }
        }
    }
}