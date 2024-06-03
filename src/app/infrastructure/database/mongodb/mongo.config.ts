import { MongoClient } from 'mongodb';

export const mongoConfig = {
    MONGODB_CNN: 'mongodb+srv://John:12345@atlascluster.q1fjhub.mongodb.net/POBLACIONAL_CDC?retryWrites=true&w=majority',
    dbName: 'POBLACIONAL_CDC',
};

export const getMongoClient = async () => {
    const client = new MongoClient(mongoConfig.MONGODB_CNN);
    await client.connect();
    return client;
};
