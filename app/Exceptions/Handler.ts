/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponse from 'App/Helpers/ApiResponse'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    // Handle errors based on route prefix
    if (ctx.request.url().startsWith('/api')) {
      return this.handleApiErrors(error, ctx)
    }
    // For web routes, use the default handler
    return super.handle(error, ctx)
  }

  private async handleApiErrors(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ApiResponse.validationError(ctx.response, error.messages.errors)
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ApiResponse.notFound(ctx.response, error.message)
    }

    if (error.code === 'E_INVALID_API_TOKEN') {
      return ApiResponse.unauthorized(ctx.response, error.message)
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ApiResponse.unauthorized(ctx.response, error.message)
    }
    /**
     * Forward rest of the exceptions to the parent class
     */
    return ApiResponse.internalServerError(ctx.response, error.message, error.stack)
  }
}
