// Декоратор для сравнения паролей в DTO с типом
// @MatchPassword<RegisterDto>('password', { message: 'Passwords do not matchPassword' })
import {
   registerDecorator,
   ValidationArguments,
   ValidationOptions,
   ValidatorConstraint,
   ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
   validate(value: any, args: ValidationArguments): boolean {
      const [relatedPropertyName] = args.constraints as [string]
      const relatedValue = (args.object as Record<string, unknown>)[
         relatedPropertyName
      ]
      return value === relatedValue
   }

   defaultMessage(args: ValidationArguments): string {
      const [relatedPropertyName] = args.constraints as [string]
      return `${args.property} must matchPassword ${relatedPropertyName}`
   }
}

export function MatchPassword<TDto>(
   relatedPropertyName: keyof TDto,
   validationOptions?: ValidationOptions
): PropertyDecorator {
   return (object: object, propertyKey: string | symbol) => {
      registerDecorator({
         name: 'MatchPassword',
         target: object.constructor,
         propertyName: propertyKey.toString(),
         options: validationOptions,
         constraints: [relatedPropertyName],
         validator: MatchPasswordConstraint
      })
   }
}
