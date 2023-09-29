#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct TrieNode {
    struct TrieNode* children[26]; // considering only lowercase English letters
    struct TrieNode* fail;
    char* output;
} TrieNode;

TrieNode* new_node() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    memset(node->children, 0, sizeof(node->children));
    node->fail = NULL;
    node->output = NULL;
    return node;
}

void build_trie(TrieNode* root, const char* words[], int size) {
    for(int i = 0; i < size; i++) {
        const char* word = words[i];
        TrieNode* current = root;
        while(*word) {
            int index = *word - 'a';
            if(!current->children[index])
                current->children[index] = new_node();
            current = current->children[index];
            word++;
        }
        current->output = strdup(words[i]);
    }
}

void build_fail_links(TrieNode* root) {
    TrieNode* queue[size];
    int front = 0, rear = 0;
    for(int i = 0; i < 26; i++) {
        if(root->children[i]) {
            root->children[i]->fail = root;
            queue[rear++] = root->children[i];
        }
    }
    while(front < rear) {
        TrieNode* current = queue[front++];
        for(int i = 0; i < 26; i++) {
            if(current->children[i]) {
                TrieNode* fail = current->fail;
                while(fail && !fail->children[i])
                    fail = fail->fail;
                current->children[i]->fail = fail ? fail->children[i] : root;
                if(current->children[i]->fail->output)
                    free(current->children[i]->output);
                current->children[i]->output = strdup(current->children[i]->fail->output);
                queue[rear++] = current->children[i];
            }
        }
    }
}

void search(TrieNode* root, const char* text) {
    TrieNode* current = root;
    for(int i = 0; text[i]; i++) {
        int index = text[i] - 'a';
        while(current != root && !current->children[index])
            current = current->fail;
        current = current->children[index] ? current->children[index] : root;
        if(current->output)
            printf("Found %s at index %d\n", current->output, i - strlen(current->output) + 1);
    }
}

int main() {
    const char* words[] = {"a", "ab", "bab", "bc", "bca", "c", "ca", "caa"};
    int size = sizeof(words) / sizeof(words[0]);
    TrieNode* root = new_node();
    build_trie(root, words, size);
    build_fail_links(root);
    search(root, "abccab");
    return 0;
}
