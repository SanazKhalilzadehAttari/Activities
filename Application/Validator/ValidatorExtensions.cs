using FluentValidation;

namespace Application.Validator
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T,string> ruleBuilder){
            var options = ruleBuilder
            .NotEmpty().MinimumLength(6).WithMessage("Password must be at least 6 char")
            .Matches("[A-Z]").WithMessage("Pasword must contain i uppercase letter")
            .Matches("[a-z]").WithMessage("Pasword must contain a lowercase letter")
            .Matches("[0-9]").WithMessage("Pasword must contain a nummeric letter");
            return options;
        }

    }
}