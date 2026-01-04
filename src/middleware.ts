import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  // Content Security Policy - Previene XSS, clickjacking, injection attacks
  // Configuración básica para un sitio estático con enlaces externos
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://cri.st https://linkedin.com https://github.com https://x.com; " +
    "frame-ancestors 'none';"
  );

  // X-Frame-Options - Previene clickjacking (redundante con CSP frame-ancestors)
  response.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options - Previene MIME-sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer-Policy - Controla qué información de referrer se envía
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions-Policy - Controla qué browser features pueden usar
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // X-XSS-Protection - Headers de protección XSS para navegadores antiguos
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Strict-Transport-Security - Forza HTTPS en producción (solo si se usa HTTPS)
  if (context.url.protocol === 'https:') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
};
