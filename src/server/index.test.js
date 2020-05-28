const index = require("./index");

let addResponse = index.addResponse;

let response = {
    polarity: 'positive',
    subjectivity: 'subjective',
    text: 'test text...',
    polarity_confidence: '0.93385',
    subjectivity_confidence: '1'
}

let projectData = addResponse(response)
let entry = projectData[0];

test('polarity stored correctly in array', () => {
    expect(entry.polarity).toBe('positive')
});

test('subjectivity stored correctly in array', () => {
    expect(entry.subjectivity).toBe('subjective')
});

test('polarity_confidence stored correctly in array', () => {
    expect(entry.polarity_confidence).toBe('0.93385')
});

test('polarity_confidence stored correctly in array', () => {
    expect(entry.subjectivity_confidence).toBe('1')
});