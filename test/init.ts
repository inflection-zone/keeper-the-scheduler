import Application from '../src/app';
import path from 'path';
import fs from 'fs';
import { before, after } from 'mocha';
import { Logger } from "../src/common/logger";
const infra = Application.instance();
///////////////////////////////////////////////////////////////////////////////
globalThis.TestCache = { };

//Set-up
before(async () => {
    Logger.instance().log('Set-up: Initializing test set-up!');
    initializeCache();
    await infra.start();
});

//Tear-down
after(() => {
    // var server = infra.server;
    // server.close(() => {
    Logger.instance().log('Tear-down: Server shut down successfully!');
    // });
});

function loadTestData() {
    var filepath = path.join(process.cwd(), 'test', 'test.data.json');
    var fileBuffer = fs.readFileSync(filepath, 'utf8');
    const obj = JSON.parse(fileBuffer);
    return obj;
}

function initializeCache() {
    const testData = loadTestData();
    globalThis.TestCache = testData;
}
