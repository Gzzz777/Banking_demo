export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const basicAuth = req.headers.get('authorization');

  const USERNAME = process.env.BASIC_AUTH_USER;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

  // Safety bypass if env variables are missing
  if (!USERNAME || !PASSWORD) {
    return new Response('Credentials not configured in Vercel.', { status: 500 });
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === USERNAME && pwd === PASSWORD) {
      // Returning this header tells Vercel's router to continue to the static app
      return new Response('Success', {
        status: 200,
        headers: { 'x-middleware-next': '1' },
      });
    }
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}