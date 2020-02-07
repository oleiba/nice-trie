class Trie {

	constructor () {
		this.root = new TrieNode();
	}

	insert(words) {
		words.forEach(w => {
			this.root.insert(w, 0);
		})
	}

	isMember(w) {
		return this.root.isMember(w, 0);
	}
}

class TrieNode {

	constructor() {
		this.children = {};
	}

	insert(w, i) {
		if (w.length === i) {
			this.children['$'] === new TrieNode();
		} else {
			this.children[w[i]] = this.children[w[i]] || new TrieNode();
			this.children[w[i]].insert(w, i + 1);
		}
	}

	isMember(w, i) {
		if (this.isLeaf()) {
			return w.length === i;
		}

		if (w.length === i) {
			// we have children, but no more chars in this word
			return false;
		}

		if (w[i] !== '.') {
			return !this.children[w[i]] ? false : this.children[w[i]].isMember(w, i + 1);
		}

		for (let k in this.children) {
			if (this.children[k].isMember(w, i + 1)) {
				return true;
			}
		}

		return false;
	}

	isLeaf() {
		return Object.keys(this.children).length === 0;
	}
}

module.exports = Trie;
