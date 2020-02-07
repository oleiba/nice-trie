const assert = require('assert');
const randomstring = require('randomstring');
const Trie = require('..');

describe('Trie', () => {
    it('zero words on setup', () => {
        initAndCheck([], ['foo'], false);
    });

    it('empty word IN', () => {
        initAndCheck([''], [''], true);
    });

    it('empty word OUT', () => {
        initAndCheck(['foo'], [''], false);
    });

    it('no-wildcard words IN', () => {
        initAndCheck(['foo', 'bar', 'baz'], ['foo', 'bar', 'baz'], true);
    });

    it('no-wilcard words OUT', () => {
        initAndCheck(['foo', 'bar', 'baz'], ['fox', 'bam', 'paz'], false);
    });

    it('no-wildcard words which are prefixes', () => {
        initAndCheck(['foo', 'bar', 'baz'], ['fo', 'ba', 'b', 'f', ''], false);
    });

    it('no-wilcard words which are longer than existing words', () => {
        initAndCheck(['foo', 'bar', 'baz'], ['foom', 'barz', 'bazr'], false);
    });

    it('wildcard words IN', () => {
        initAndCheck(['foo', 'bar', 'baz'], ['fo.', 'ba.', '.oo', '.az', '.ar', '..r', '..z', '..o', 'b..', '...'], true);
    });

    it('wildcard words OUT', () => {
        initAndCheck(['foo', 'bar', 'baz'], ['fp.', 'bs.', '.ro', '.', '..', '....'], false);
    });

    it('random words IN', () => {
        const randomWords = [];
        for (let i = 0; i < 100; i++) {
            randomWords.push(randomstring.generate({
                length: 100,
                charset: 'alphabetic'
            }));
        }
        initAndCheck(randomWords, randomWords, true);
    });

    it('random words OUT', () => {
        const randomWords = [];
        for (let i = 0; i < 100; i++) {
            randomWords.push(randomstring.generate({
                length: 100,
                charset: 'alphabetic'
            }));
        }
        initAndCheck(randomWords.slice(0, 50), randomWords.slice(50, 0), true);
    });
});

function initAndCheck(words, wordsToCheck, positive) {
    const t = new Trie();
    t.insert(words);
    wordsToCheck.forEach(w => {
        assert.strictEqual(t.isMember(w), positive);
    })
}
