export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    name: process.env.APP_NAME,
    environment: process.env.NODE_ENV,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  oracle: {
    mode: process.env.ORACLE_MODE ?? 'mock',
    username: process.env.ORACLE_USERNAME,
    password: process.env.ORACLE_PASSWORD,
  },
});
