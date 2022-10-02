const config = {
    connectionString: process.env['CONNECTION_STRING'] ?? '',
    collectionName: process.env['COLLECTION_NAME'] ?? '',
    dbName: process.env['DB_NAME'] ?? ''
};

export default config;