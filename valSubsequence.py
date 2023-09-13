def isValidSubsequence(array, sequence):
    """
    validates if second array is subsequence of the first array
    """
    index_arr = 0
    index_seq = 0

    while index_arr < len(array) and index_seq < len(sequence):
        if array[index_arr] == sequence[index_seq]:
            index_seq += 1
        index_arr += 1
    return index_seq == len(sequence)
    