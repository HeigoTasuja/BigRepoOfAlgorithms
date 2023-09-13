package main


func twoNumSum(array []int, target int) []int {
	nums := map[int]bool{}
	for _, num := range array {
		match := target - num
		if _, found := nums[match]; found {
			return[]int{match, num}
		}
		nums[num] = true
	}
	return[]int{}
} 


//     function takes in an array of integers and int representing target sum, if any numbers in array sum up to target, function turns them in order. //