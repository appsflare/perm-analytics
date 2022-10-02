import * as xlsx from 'xlsx';
import Undici from 'undici';
export default async function parsePERMDocument(uri: string, version: string) {
    if (uri === undefined) {
        throw new Error('uri is required');
    }


    const { body, statusCode } = await Undici.request(uri);

    if (statusCode !== 200) {
        throw new Error(`Could not download perm data file from: ${uri}`);
    }

    body.blob();

    const workbook = xlsx.read(await body.arrayBuffer());
    if (workbook.SheetNames.length === 0) {
        throw new Error('Invalid perm file');
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    return xlsx.utils.sheet_to_json(sheet, { header: 1 }).map((i: any) => ({ ...i, version }));

}