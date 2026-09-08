module.exports = {
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: Number(process.env.PORT || 3000),
  node_env: process.env.NODE_ENV || 'development',
};
