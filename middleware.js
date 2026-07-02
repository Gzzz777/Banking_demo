export const config = {
  // Matches all routes except static files (images, favicons, etc.)
  matcher: '/((?!_next|favicon.ico|.*\\..*).*)',
};

export default async function middleware(req) {
  const url = new URL(req.url);
  const cookieHeader = req.headers.get('cookie') || '';
  
  // Simple check to see if the authentication cookie is present
  const isTargetAuthenticated = cookieHeader.includes('site_auth_token=authenticated');
  const SECRET_PASSWORD = process.env.SITE_PASSWORD;

  // Safety fallback if environment variable isn't configured in Vercel yet
  if (!SECRET_PASSWORD) {
    return new Response(null, { status: 302, headers: { 'Location': url.href } });
  }

  // 1. Handle password submission via query parameters (?password=...)
  if (url.searchParams.has('password')) {
    const submittedPassword = url.searchParams.get('password');

    if (submittedPassword === SECRET_PASSWORD) {
      // Correct password: Set cookie and redirect back to clean original path
      url.searchParams.delete('password');
      return new Response(null, {
        status: 302,
        headers: {
          'Location': url.pathname,
          'Set-Cookie': 'site_auth_token=authenticated; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=604800',
        },
      });
    } else {
      // Wrong password: Redirect back with error flag
      return new Response(null, {
        status: 302,
        headers: { 'Location': `${url.pathname}?error=true` },
      });
    }
  }

  // 2. If the user is already authenticated, allow the request to pass through normally
  if (isTargetAuthenticated) {
    return; // Returning nothing tells Vercel to proceed to your React static assets
  }

  // 3. Otherwise, serve the standalone lock screen HTML page directly from the edge network
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
        <p>Please enter the password to view this application.</p>
        <form method="GET" action="">
          <input type="password" name="password" placeholder="Enter Password" required autofocus />
          <button type="submit">Submit</button>
        </form>
        ${hasError ? '<div class="error">Invalid password. Try again.</div>' : ''}
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}