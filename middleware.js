import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookie = req.cookies.get('site_auth_token')?.value;
  const url = req.nextUrl.clone();

  // The password you set in Vercel Environment Variables
  const SECRET_PASSWORD = process.env.SITE_PASSWORD;

  // Safety fallback if environment variable isn't set up yet
  if (!SECRET_PASSWORD) {
    return NextResponse.next();
  }

  // 1. Handle password submission via query parameter or form action
  if (url.searchParams.has('password')) {
    const submittedPassword = url.searchParams.get('password');
    
    if (submittedPassword === SECRET_PASSWORD) {
      // Correct password: set a secure session cookie and redirect to clean URL
      const response = NextResponse.redirect(url.origin + url.pathname);
      response.cookies.set('site_auth_token', 'authenticated', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // Valid for 7 days
      });
      return response;
    } else {
      // Wrong password: redirect back with an error indicator
      return NextResponse.redirect(`${url.origin}${url.pathname}?error=true`);
    }
  }

  // 2. If the user has a valid cookie, let them see your React App
  if (cookie === 'authenticated') {
    return NextResponse.next();
  }

  // 3. If no valid cookie, serve a beautiful standalone HTML lock screen directly from the edge
  const hasError = url.searchParams.has('error');
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Protected Site</title>
      <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; display: flex; justify-content: center; align-items: center; height: 100vh; color: #f8fafc; }
        .card { background: #1e293b; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); width: 100%; max-width: 380px; text-align: center; border: 1px solid #334155; }
        h1 { margin: 0 0 0.5rem; font-size: 1.5rem; color: #f1f5f9; }
        p { color: #94a3b8; font-size: 0.875rem; margin-bottom: 2rem; }
        input { width: 100%; padding: 0.75rem; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; font-size: 1rem; box-sizing: border-box; outline: none; margin-bottom: 1rem; }
        input:focus { border-color: #6366f1; }
        button { width: 100%; padding: 0.75rem; border-radius: 6px; border: none; background: #4f46e5; color: white; font-size: 1rem; font-weight: 600; cursor: pointer; }
        button:hover { background: #4338ca; }
        .error { color: #f87171; font-size: 0.875rem; margin-top: 1rem; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🔒 Private Demo Site</h1>
        <p>Please enter the access token to view this application.</p>
        <form method="GET" action="">
          <input type="password" name="password" placeholder="Enter Password" required autofocus />
          <button type="submit">Submit</button>
        </form>
        ${hasError ? '<div class="error">Invalid password. Try again.</div>' : ''}
      </div>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

// Config stops middleware from running against static assets like images
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
};