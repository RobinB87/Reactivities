using Domain;
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
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            // Even though commands do not return anything, this is still returning a Task of type Unit
            // This is just an object that MediatR provides, but it does not have any real value.
            // It is like returning nothing, but it tells the API that the request is finished, so it can move on.
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}