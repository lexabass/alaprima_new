module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https://*'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'your-aws-s3-bucket.s3.your-region.amazonaws.com', // Замените на ваш S3 бакет
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'your-aws-s3-bucket.s3.your-region.amazonaws.com', // Замените на ваш S3 бакет
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000', // URL вашего Next.js приложения в разработке
        'http://your-production-domain.com' // URL вашего Next.js приложения в продакшене
      ],
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options'
      ],
      keepHeaderOnError: true,
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
