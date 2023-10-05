const env = {
  port: process.env.PORT || 3000,
  logLevel: process.env.LOG_LEVEL || 'info',
  URI: process.env.URI ||
  'mongodb+srv://uat-user:vB7m4gJAc1Qb9KZP@rbac-instance.lj2ns.mongodb.net/hmcluatdb?retryWrites=true&w=majority'
 ||  'mongodb://localhost:27017',
  mongoDb: process.env.mongoDB || 'nodets-ai',
  solaceUrl : "tcp://localhost:55555",
  solaceUsername :"admin",
  solacePassword: "admin",
  solaceVpn: "default",
};

export default env;
/*
  'mongodb+srv://uat-user:vB7m4gJAc1Qb9KZP@rbac-instance.lj2ns.mongodb.net/hmcluatdb?retryWrites=true&w=majority'
  MONGO_PATH: "rbac-instance.lj2ns.mongodb.net", //uat instance
  MONGO_DBNAME: "hmcluatdb", //uat instance
  MONGO_HOST: "uat-user", //uat instance
  MONGO_PASSWORD: "vB7m4gJAc1Qb9KZP", //uat instance
*/