export const configuration = () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3456,
    appRoot: process.cwd(),
    hostname: process.env.APP_HOSTNAME || '0.0.0.0',
    host:
      process.env.APP_HOST || `http://localhost:${process.env.APP_PORT || 3456}`,
    app:
      process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`,
    apiPrefix: process.env.API_PREFIX || 'api',
    stagingUrl: process.env.STAGING_URL || 'https://staging.playlistswap.ng',
    DevserverUrl: process.env.DEV_URL || 'https://playlist-ts-1.onrender.com',
    renderStagingUrl:
      process.env.RENDER_STAGING_URL || 'https://staging-playlist.onrender.com',
    prodUrl: process.env.PROD_URL || 'https://api.playlistswap.ng',
    renderProdUrl:
      process.env.RENDER_PROD_URL || 'https://playlist-ts.onrender.com',
  
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET,
      refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },
    
    Queue: {
      url: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      user: process.env.REDIS_USERNAME,
      pass: process.env.REDIS_PASS,
      db: process.env.REDIS_DB || 'playlist-swap',
    },
  
  });
  