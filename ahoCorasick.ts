class TrieNode {
    public children: Record<string, TrieNode> = {};
    public isEndOfWord = false;
    public fail: TrieNode | null = null;
    public output: string[] = [];
  }
  
  class AhoCorasick {
    private root: TrieNode = new TrieNode();
  
    public buildTrie(words: string[]): void {
      for (const word of words) {
        let current: TrieNode = this.root;
        for (const char of word) {
          if (!current.children[char]) current.children[char] = new TrieNode();
          current = current.children[char];
        }
        current.isEndOfWord = true;
        current.output.push(word);
      }
    }
  
    public buildFailLinks(): void {
      const queue: TrieNode[] = [this.root];
      while (queue.length) {
        const current: TrieNode | undefined = queue.shift();
        if (!current) continue;
  
        for (const char in current.children) {
          const nextNode: TrieNode = current.children[char];
          if (current === this.root) nextNode.fail = this.root;
          else {
            let failNode: TrieNode | null = current.fail;
            while (failNode && !failNode.children[char]) failNode = failNode.fail;
            nextNode.fail = failNode ? failNode.children[char] : this.root;
            nextNode.output = nextNode.output.concat(nextNode.fail.output);
          }
          queue.push(nextNode);
        }
      }
    }
  
    public search(text: string): void {
      let current: TrieNode = this.root;
      for (let i = 0; i < text.length; i++) {
        const char: string = text[i];
        while (current && !current.children[char]) current = current.fail as TrieNode;
        if (!current) current = this.root;
        else current = current.children[char];
        if (current.output.length)
          console.log(`Matched ${current.output} at index ${i - current.output[0].length + 1}`);
      }
    }
  }
  
  // Example
  const ac = new AhoCorasick();
  ac.buildTrie(['a', 'ab', 'bab', 'bc', 'bca', 'c', 'ca', 'caa']);
  ac.buildFailLinks();
  ac.search('abccab');
  