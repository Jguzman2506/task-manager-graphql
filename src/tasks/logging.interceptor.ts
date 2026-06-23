import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor para aplicar Programación Orientada a Aspectos (AOP).
 * Captura las peticiones GraphQL de forma transversal para generar logs sin tocar los servicios.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
private readonly logger = new Logger('TasksAspect');

intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const { fieldName } = gqlContext.getInfo();
    const now = Date.now();

    // Lógica ejecutada ANTES del resolver (Before Aspect)
    this.logger.log(`[AOP - LOG] Iniciando ejecución de la operación: ${fieldName}`);

    return next.handle().pipe(
    tap(() => {
        // Lógica ejecutada DESPUÉS del resolver (After Aspect)
        const duration = Date.now() - now;
        this.logger.log(`[AOP - LOG] Operación ${fieldName} finalizada con éxito (+${duration}ms)`);
    }),
    );
}
}