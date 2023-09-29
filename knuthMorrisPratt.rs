fn knuth_morris_pratt(string: &str, substring: &str) -> bool {
    let pattern = build_pattern(substring);
    matches(string, substring, &pattern)
}

fn build_pattern(substring: &str) -> Vec<i32> {
    let mut pattern = vec![-1; substring.len()];
    let mut j = 0;
    let mut i = 0;
    let chars: Vec<char> = substring.chars().collect();
    while i < substring.len() {
        if chars[i] == chars[j] {
            pattern[i] = j as i32;
            i += 1;
            j += 1;
        } else if j > 0 {
            j = (pattern[j - 1] + 1) as usize;
        } else {
            i += 1;
        }
    }
    pattern
}

fn matches(string: &str, substring: &str, pattern: &[i32]) -> bool {
    let mut i = 0;
    let mut j = 0;
    let string_chars: Vec<char> = string.chars().collect();
    let substring_chars: Vec<char> = substring.chars().collect();
    while i + substring.len() - j <= string.len() {
        if string_chars[i] == substring_chars[j] {
            if j == substring.len() - 1 {
                return true;
            }
            i += 1;
            j += 1;
        } else if j > 0 {
            j = (pattern[j - 1] + 1) as usize;
        } else {
            i += 1;
        }
    }
    false
}

fn main() {
    // Example
    println!("{}", knuth_morris_pratt("abcde", "cd")); // Prints "true"
}
