def twoNumberSum(array, targetSum):
    """
    function takes in an array of integers and int representing target sum, if any numbers in array sum up to target, function turns them in order.
    """
    numbers = set()
    for i in array:
        difference = targetSum - i
        if difference in numbers:
            return[difference, i]
        numbers.add(i)
    return []