import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  // Pulling credentials safely from Vercel's environment variables
  const USERNAME = process.env.BASIC_AUTH_USER;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

  // If environment variables aren't set up yet, bypass to avoid locking yourself out
  if (!USERNAME || !PASSWORD) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === USERNAME && pwd === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Config ensures this runs on all pages except static assets and images
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};