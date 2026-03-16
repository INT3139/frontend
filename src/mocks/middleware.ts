import { HttpStatus } from '@/lib/http-status-wrapper';
import { HttpResponse, type HttpResponseResolver } from 'msw';

export function withAuth(resolver: HttpResponseResolver): HttpResponseResolver {
  return (input) => {
    const { request } = input;
    if (!request.headers.get('Authorization')?.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: HttpStatus.UNAUTHORIZED });
    }

    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!isValidAccessToken(token)) {
      return new HttpResponse(null, { status: HttpStatus.UNAUTHORIZED });
    }

    return resolver(input);
  };
}

function isValidAccessToken(token?: string) {
  if (!token || token !== 'mockAccessToken') {
    return false;
  }
  return true;
}
