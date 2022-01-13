module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ad9ec1c8fcf7dcfc86bebe4a544bd305'),
  },
});
