/**
 *
 * @param {Error & { status?: number; code?: string }} err
 * @param {{ error : (err: Error) => void}} [log]
 */
export function errorHandler(err, log = console) {
  const status = err.status || 500

  const body = {
    error: {
      code: err.code || 'HTTP_ERROR',
      message: err.message || 'Server Error',
    },
  }
  if (status >= 500) {
    log.error(err)
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export class HTTPError extends Error {
  /**
   *
   * @param {string} [message]
   * @param {number} [status]
   */
  constructor(message = 'Internal Server Error.', status = 500) {
    super(message)
    this.code = 'HTTP_ERROR'
    this.status = status
  }

  /**
   *
   * @param {Error & { status?: number; code?: string }} err
   * @returns
   */
  static respond(err) {
    const body = {
      error: {
        code: err.code || 'HTTP_ERROR',
        message: err.message || 'Internal Server Error.',
      },
    }
    return new Response(JSON.stringify(body), {
      status: err.status || 500,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  }
}
