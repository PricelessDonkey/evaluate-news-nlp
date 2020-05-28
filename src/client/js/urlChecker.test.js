import {checkForUrl} from './urlChecker'

const httpsUrl = 'https://test.com'
const httpUrl = 'http://test.com'
const badUrl = 'badUrl.com'

test('https URL returns true', () => {
    expect(checkForUrl(httpsUrl)).toBe(true);
});

test('http URL returns true', () => {
    expect(checkForUrl(httpUrl)).toBe(true);
});

test('bad URL returns false', () => {
    expect(checkForUrl(badUrl)).toBe(false);
});