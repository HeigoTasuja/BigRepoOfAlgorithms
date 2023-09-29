class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
      this.fail = null;
      this.output = [];
    }
  }
  
  class AhoCorasick {
    constructor() {
      this.root = new TrieNode();
    }
  
    buildTrie(words) {
      for (let word of words) {
        let current = this.root;
        for (let char of word) {
          if (!current.children[char]) current.children[char] = new TrieNode();
          current = current.children[char];
        }
        current.isEndOfWord = true;
        current.output.push(word);
      }
    }
  
    buildFailLinks() {
      let queue = [this.root];
      while (queue.length) {
        let current = queue.shift();
        for (let char in current.children) {
          let nextNode = current.children[char];
          if (current === this.root) nextNode.fail = this.root;
          else {
            let failNode = current.fail;
            while (failNode && !failNode.children[char]) failNode = failNode.fail;
            nextNode.fail = (failNode ? failNode.children[char] : this.root);
            nextNode.output = nextNode.output.concat(nextNode.fail.output);
          }
          queue.push(nextNode);
        }
      }
    }
  
    search(text) {
      let current = this.root;
      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        while (current && !current.children[char]) current = current.fail;
        if (!current) current = this.root;
        else current = current.children[char];
        if (current.output.length)
          console.log(`Matched ${current.output} at index ${i - current.output[0].length + 1}`);
      }
    }
  }
  
  // Example
  let ac = new AhoCorasick();
  ac.buildTrie(['a', 'ab', 'bab', 'bc', 'bca', 'c', 'ca', 'caa']);
  ac.buildFailLinks();
  ac.search('abccab');
  