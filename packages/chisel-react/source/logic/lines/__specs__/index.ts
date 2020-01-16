import {
    TextLine
} from '../../../interfaces/internal';

import {
    computeLines,
    getCurrentLine,
} from '../';



describe('computeLines', () => {
    it('basic - 2 lines', () => {
        const text = '1234\n5678';
        const result = computeLines(text);
        const expected: TextLine[] = [
            {
                index: 0,
                start: 0,
                text: '1234',
            },
            {
                index: 1,
                start: 4,
                text: '5678',
            },
        ];
        expect(result).toEqual(expected);
    });

    it('basic - 4 lines', () => {
        const text = '1234\n\n\n5678';
        const result = computeLines(text);
        const expected: TextLine[] = [
            {
                index: 0,
                start: 0,
                text: '1234',
            },
            {
                index: 1,
                start: 4,
                text: '',
            },
            {
                index: 2,
                start: 5,
                text: '',
            },
            {
                index: 3,
                start: 6,
                text: '5678',
            },
        ];
        expect(result).toEqual(expected);
    });
});


describe('getCurrentLine', () => {
    it('basic - 2 lines - 1st line', () => {
        const text = '1234\n5678';
        const cursor = 2;
        const result = getCurrentLine(text, cursor);
        const expected = {
            index: 0,
            line: { index: 0, start: 0, text: '1234' },
            lines: [
                { index: 0, start: 0, text: '1234' },
                { index: 1, start: 4, text: '5678' }
            ],
        };
        expect(result).toEqual(expected);
    });

    it('basic - 2 lines - 2nd line', () => {
        const text = '1234\n5678';
        const cursor = 5;
        const result = getCurrentLine(text, cursor);
        const expected = {
            index: 0,
            line: { index: 0, start: 0, text: '1234' },
            lines: [
                { index: 0, start: 0, text: '1234' },
                { index: 1, start: 4, text: '5678' },
            ],
        };
        expect(result).toEqual(expected);
    });

    it('basic - 3 lines - 2nd line', () => {
        const text = '1234\n\n5678';
        const cursor = 5;
        const result = getCurrentLine(text, cursor);
        const expected = {
            index: 1,
            line: { index: 1, start: 4, text: '' },
            lines: [
                { index: 0, start: 0, text: '1234' },
                { index: 1, start: 4, text: '' },
                { index: 2, start: 5, text: '5678' },
            ],
        };
        expect(result).toEqual(expected);
    });

    it.only('basic - 3 lines - end of 3rd line', () => {
        const text = '1234\n\n5678';
        const cursor = 10;
        const result = getCurrentLine(text, cursor);
        const expected = {
            index: 2,
            line: { index: 2, start: 5, text: '5678' },
            lines: [
                { index: 0, start: 0, text: '1234' },
                { index: 1, start: 4, text: '' },
                { index: 2, start: 5, text: '5678' },
            ],
        };
        // console.log(result);
        expect(result).toEqual(expected);
    });
});
