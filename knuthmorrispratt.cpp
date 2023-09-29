#include <iostream>
#include <vector>
#include <string>

std::vector<int> buildPattern(const std::string& substring) {
    std::vector<int> pattern(substring.length(), -1);
    int j = 0;
    int i = 1;
    while(i < substring.length()) {
        if(substring[i] == substring[j]) {
            pattern[i] = j;
            i++;
            j++;
        } else if(j > 0) {
            j = pattern[j - 1] + 1;
        } else {
            i++;
        }
    }
    return pattern;
}

bool matches(const std::string& str, const std::string& substring, const std::vector<int>& pattern) {
    int i = 0;
    int j = 0;
    while(i + substring.length() - j <= str.length()) {
        if(str[i] == substring[j]) {
            if(j == substring.length() - 1) return true;
            i++;
            j++;
        } else if(j > 0) {
            j = pattern[j - 1] + 1;
        } else {
            i++;
        }
    }
    return false;
}

bool knuthMorrisPratt(const std::string& str, const std::string& substring) {
    std::vector<int> pattern = buildPattern(substring);
    return matches(str, substring, pattern);
}

int main() {
    // Example
    if(knuthMorrisPratt("abcde", "cd")) {
        std::cout << "Match found!" << std::endl;
    } else {
        std::cout << "Match not found!" << std::endl;
    }

    return 0;
}
