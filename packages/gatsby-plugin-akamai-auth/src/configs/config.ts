const config = {
  clientSecret: process.env.JANRAIN_CLIENT_SECRET || '',
  redirectUri: process.env.JANRAIN_REDIRECT_URI || '',
  FileStoreSessionOptions: {
    path: process.env.SESSION_STORAGE_PATH || './janrain_sessions',
    ttl: process.env.SESSION_STORAGE_TTL || '3600',
    secret: process.env.SESSION_SECRET || 'SUPERSECRETSTRING',
  },
};

export default config;
