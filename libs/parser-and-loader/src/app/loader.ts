import { MongoClient } from 'mongodb';

export interface ILoadRowsOptions {
    connectionString: string;
    dbName: string;
    collectionName: string;
}

export default async function loadRows(rows: any[], options: ILoadRowsOptions) {
    const { collectionName, connectionString, dbName } = options;
    const client = await MongoClient.connect(connectionString);
    try {
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName);

        await collection.insertMany(rows);
    }
    catch (e) {
        console.error(e);
    }
    await client.close();
}