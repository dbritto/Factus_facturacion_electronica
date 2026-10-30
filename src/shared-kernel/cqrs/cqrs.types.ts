import { Result } from '@shared/core/result.js';

// Contrato para toda acción que MODIFICA datos (Create, Update, Delete)
export interface ICommandHandler<TCommand, TResponse = void> {
    execute(command: TCommand): Promise<Result<TResponse>>;
}

// Contrato para toda acción que SOLO LEE datos (Get, List, Search)
export interface IQueryHandler<TQuery, TResponse> {
    execute(query: TQuery): Promise<Result<TResponse>>;
}