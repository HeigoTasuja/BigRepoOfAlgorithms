use std::collections::VecDeque;
use std::collections::HashMap;

#[derive(Default)]
struct TrieNode {
    children: HashMap<char, Box<TrieNode>>,
    fail: Option<Box<TrieNode>>,
    output: Vec<String>,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: HashMap::new(),
            fail: None,
            output: Vec::new(),
        }
    }
}

struct AhoCorasick {
    root: Box<TrieNode>,
}

impl AhoCorasick {
    fn new() -> Self {
        AhoCorasick {
            root: Box::new(TrieNode::new()),
        }
    }

    fn build_trie(&mut self, words: Vec<&str>) {
        for &word in &words {
            let mut current = &mut self.root;
            for c in word.chars() {
                current = current.children.entry(c).or_insert(Box::new(TrieNode::new()));
            }
            current.output.push(word.to_string());
        }
    }

    fn build_fail_links(&mut self) {
        let mut queue = VecDeque::new();
        queue.push_back(&mut self.root);
        while let Some(node) = queue.pop_front() {
            let fail_node = node.fail.as_deref().unwrap_or(&self.root);
            for (char, child) in &mut node.children {
                child.fail = Some(fail_node.children.get(char).cloned().unwrap_or(Box::new(fail_node.clone())));
                child.output.extend(child.fail.as_ref().unwrap().output.clone());
                queue.push_back(child);
            }
        }
    }

    fn search(&self, text: &str) {
        let mut current = &self.root;
        for (i, c) in text.chars().enumerate() {
            while !current.children.contains_key(&c) {
                current = current.fail.as_deref().unwrap_or(&self.root);
            }
            current = current.children.get(&c).unwrap_or(&self.root);
            for string in &current.output {
                println!("Found {} at index {}", string, i - string.len() + 1);
            }
        }
    }
}

fn main() {
    let mut ac = AhoCorasick::new();
    ac.build_trie(vec!["a", "ab", "bab", "bc", "bca", "c", "ca", "caa"]);
    ac.build_fail_links();
    ac.search("abccab");
}
