import {
    TextLine
} from '../../../interfaces/internal';

import {
    computeLines,
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

    it.only('basic - 4 lines', () => {
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
