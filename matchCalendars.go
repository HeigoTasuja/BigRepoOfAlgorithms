package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// Example usage
}

func matchCalendars(calendar1 [][]string, dailyBounds1 []string, calendar2 [][]string, dailyBounds2 []string, duration int) [][]string {
	updatedCalendar1 := updateCalendar(calendar1, dailyBounds1)
	updatedCalendar2 := updateCalendar(calendar2, dailyBounds2)
	mergedCalendar := mergeCalendar(updatedCalendar1, updatedCalendar2)
	sortedCalendars := sortCalendars(mergedCalendar)
	return getAvailabilities(sortedCalendars, duration)
}

func updateCalendar(calendar [][]string, dailyBounds []string) [][]int {
	updated := append([][]string{{"0:00", dailyBounds[0]}}, calendar...)
	updated = append(updated, []string{dailyBounds[1], "23:59"})
	return transformToMinutes(updated)
}

func mergeCalendar(calendar1 [][]int, calendar2 [][]int) [][]int {
	var merged [][]int
	i, j := 0, 0
	for i < len(calendar1) && j < len(calendar2) {
		meeting1, meeting2 := calendar1[i], calendar2[j]
		if meeting1[0] < meeting2[0] {
			merged = append(merged, meeting1)
			i++
		} else {
			merged = append(merged, meeting2)
			j++
		}
	}
	for i < len(calendar1) {
		merged = append(merged, calendar1[i])
		i++
	}
	for j < len(calendar2) {
		merged = append(merged, calendar2[j])
		j++
	}
	return merged
}

func sortCalendars(calendar [][]int) [][]int {
	sorted := [][]int{calendar[0]}
	for i := 1; i < len(calendar); i++ {
		current := calendar[i]
		previous := sorted[len(sorted)-1]
		if previous[1] >= current[0] {
			previous[1] = max(previous[1], current[1])
		} else {
			sorted = append(sorted, current)
		}
	}
	return sorted
}

func getAvailabilities(calendar [][]int, duration int) [][]string {
	var availabilities [][]string
	for i := 1; i < len(calendar); i++ {
		start, end := calendar[i-1][1], calendar[i][0]
		if end-start >= duration {
			availabilities = append(availabilities, []string{minutesToTime(start), minutesToTime(end)})
		}
	}
	return availabilities
}

func transformToMinutes(calendar [][]string) [][]int {
	var inMinutes [][]int
	for _, times := range calendar {
		inMinutes = append(inMinutes, []int{timeToMinutes(times[0]), timeToMinutes(times[1])})
	}
	return inMinutes
}

func timeToMinutes(time string) int {
	parts := strings.Split(time, ":")
	hours, _ := strconv.Atoi(parts[0])
	minutes, _ := strconv.Atoi(parts[1])
	return hours*60 + minutes
}

func minutesToTime(minutes int) string {
	hours := minutes / 60
	mins := minutes % 60
	return fmt.Sprintf("%d:%02d", hours, mins)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
