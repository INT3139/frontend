import { type HttpResponseResolver } from 'msw';

export function withAuth(resolver: HttpResponseResolver): HttpResponseResolver {
  return (input) => {
    // const { request } = input
    // if (!request.headers?.get('Authorization')?.startsWith('Bearer ')) {
    //   return new HttpResponse(null, { status: 401 })
    // }

    return resolver(input);
  };
}
