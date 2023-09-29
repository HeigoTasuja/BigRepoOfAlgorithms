from collections import deque


class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        self.fail = None
        self.output = []

class AhoCorasick:
    def __init__(self):
        self.root = TrieNode()

    def build_trie(self, words):
        for word in words:
            current = self.root
            for char in word:
                if char not in current.children:
                    current.children[char] = TrieNode()
                current = current.children[char]
            current.is_end_of_word = True
            current.output.append(word)

    def build_fail_links(self):
        queue = deque([self.root])
        while queue:
            current = queue.popleft()
            for char, next_node in current.children.items():
                if current is self.root:
                    next_node.fail = self.root
                else:
                    fail_node = current.fail
                    while fail_node and char not in fail_node.children:
                        fail_node = fail_node.fail
                    next_node.fail = fail_node.children[char] if fail_node else self.root
                    next_node.output += next_node.fail.output
                queue.append(next_node)

    def search(self, text):
        current = self.root
        for i, char in enumerate(text):
            while current and char not in current.children:
                current = current.fail
            if not current:
                current = self.root
                continue
            current = current.children[char]
            if current.output:
                print(f"Matched {current.output} at index {i - len(current.output[0]) + 1}")


if __name__ == '__main__':
    ac = AhoCorasick()
    ac.build_trie(['a', 'ab', 'bab', 'bc', 'bca', 'c', 'ca', 'caa'])
    ac.build_fail_links()
    ac.search('abccab')
