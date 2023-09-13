function twoNumSum(array, target) {
    const nums = {};
    for (const num of array) {
        const match = target - num;
        if (match in nums){
            return [match, num];
        }
     else {
        nums[num] = true;
        }
    }
    return[];
}


// function takes in an array of integers and int representing target sum, if any numbers in array sum up to target, function turns them in order.
