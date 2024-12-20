import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    InternalServerErrorException
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable()
export class ResponseValidationInterceptor<T extends object>
    implements NestInterceptor<any, T>
{
    constructor(private readonly dto: new () => T) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle().pipe(
            switchMap(async (data) => {
                const transformedData = plainToInstance(
                    this.dto,
                    instanceToPlain(data)
                );

                const errors = await validate(transformedData);
                if (errors.length > 0) {
                    const contextType = context.getType();
                    if (contextType === "http") {
                        throw new InternalServerErrorException({
                            message: "Intercepted response validation failed",
                            errors
                        });
                    } else if (contextType === "rpc") {
                        throw new RpcException({
                            message: "Intercepted response validation failed",
                            errors
                        });
                    }
                }

                return transformedData;
            })
        );
    }
}
