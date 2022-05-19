// import { MongoMemoryServer } from 'mongodb-memory-server';
// import * as mongoose from 'mongoose';
// import { connectionOptions } from '../db/connection';



// let mongoServer;

// beforeAll(async () => {
//   mongoServer = new MongoMemoryServer();

//   await initBroker();

//   initMemoryStorage();

//   const mongoUri = await mongoServer.getConnectionString();

//   await mongoose.connect(mongoUri, {
//     ...connectionOptions,
//     useUnifiedTopology: true
//   });
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();

//   if (global.gc) {
//     global.gc();
//   }
// });

// export const sleep = ms => {
//   return new Promise(resolve => {
//     setTimeout(resolve, ms);
//   });
// };
