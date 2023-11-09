/*
 * Sobrescrevendo o objeto Request do Express para adicionar a variável id
 * no objeto requisição no middleware de autenticação.
 */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
