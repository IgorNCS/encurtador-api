import { IsString, IsNotEmpty, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate, ValidationOptions, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'isUrlWithProtocol', async: false })
export class IsUrlWithProtocolConstraint implements ValidatorConstraintInterface {
    validate(url: string, args: ValidationArguments) {
        return url.startsWith('http://') || url.startsWith('https://');
    }

    defaultMessage(args: ValidationArguments) {
        return 'URL must start with http:// or https://';
    }
}

export function IsUrlWithProtocol(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUrlWithProtocolConstraint,
        });
    };
}

export class CreateLinkDto {
    @IsNotEmpty()
    @IsString()
    @IsUrlWithProtocol()
    url: string;
}