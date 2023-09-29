#include <iostream>
#include <unordered_map>
#include <queue>
#include <vector>
#include <string>

struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEndOfWord = false;
    TrieNode* fail = nullptr;
    std::vector<std::string> output;
};

class AhoCorasick {
public:
    AhoCorasick() : root(new TrieNode) {}
    
    void buildTrie(const std::vector<std::string>& words) {
        for (const auto& word: words) {
            auto* current = root;
            for (const auto& ch: word) {
                if (current->children.find(ch) == current->children.end())
                    current->children[ch] = new TrieNode;
                current = current->children[ch];
            }
            current->isEndOfWord = true;
            current->output.push_back(word);
        }
    }

    void buildFailLinks() {
        std::queue<TrieNode*> q;
        q.push(root);
        while (!q.empty()) {
            auto* current = q.front();
            q.pop();
            for (const auto& [ch, nextNode]: current->children) {
                if (current == root)
                    nextNode->fail = root;
                else {
                    auto* failNode = current->fail;
                    while (failNode && failNode->children.find(ch) == failNode->children.end())
                        failNode = failNode->fail;
                    nextNode->fail = failNode ? failNode->children[ch] : root;
                    for (const auto& str: nextNode->fail->output)
                        nextNode->output.push_back(str);
                }
                q.push(nextNode);
            }
        }
    }

    void search(const std::string& text) {
        auto* current = root;
        for (int i = 0; i < text.length(); ++i) {
            const auto& ch = text[i];
            while (current && current->children.find(ch) == current->children.end())
                current = current->fail;
            if (!current) current = root;
            else current = current->children[ch];
            if (!current->output.empty())
                std::cout << "Matched " << current->output.front() << " at index " << i - current->output.front().length() + 1 << std::endl;
        }
    }

private:
    TrieNode* root;
};

int main() {
    AhoCorasick ac;
    ac.buildTrie({"a", "ab", "bab", "bc", "bca", "c", "ca", "caa"});
    ac.buildFailLinks();
    ac.search("abccab");
    return 0;
}
