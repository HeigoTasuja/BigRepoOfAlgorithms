package main

import "fmt"

func main() {
    // Example
    fmt.Println(knuthMorrisPratt("abcde", "cd")) // Prints true
}

func knuthMorrisPratt(str, substr string) bool {
    pattern := buildPattern(substr)
    return matches(str, substr, pattern)
}

func buildPattern(substr string) []int {
    pattern := make([]int, len(substr))
    for i := range pattern {
        pattern[i] = -1
    }
    j, i := 0, 0
    for i < len(substr) {
        if substr[i] == substr[j] {
            pattern[i] = j
            i++
            j++
        } else if j > 0 {
            j = pattern[j-1]
        }
    }
}
