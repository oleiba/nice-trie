[![Build Status](https://travis-ci.org/oleiba/nice-trie.svg?branch=master)](https://travis-ci.org/oleiba/nice-trie)

# nice-trie

Simple [Trie](https://en.wikipedia.org/wiki/Trie) data structure implementation in JavaScript.
Including support for simple '.' wildcards.

## Installation

```
$ npm install nice-trie
```

## Usage

```
const Trie = require('nice-trie');
const trie = new Trie();
Trie.insert(['hello', 'world', 'nice', 'trie']);
Trie.isMember('nice');
// true
Trie.isMember('n.c.');
// true
Trie.isMember('nicee');
// false
```


