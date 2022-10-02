import loadRows from "./app/loader";
import parsePERMDocument from "./app/parser";
import config from "./config";

export default async function main(args: any) {

    const rows = await parsePERMDocument(args.documentUri, args.version);
    await loadRows(rows, { collectionName: config.collectionName, connectionString: config.connectionString, dbName: config.dbName });
}