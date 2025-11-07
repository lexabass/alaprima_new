module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a-secure-random-string'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'a-secure-random-salt'),
  },
});
