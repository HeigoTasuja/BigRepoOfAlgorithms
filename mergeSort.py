def mergeSort(array):
    if len(array) <= 1:
        return array
    auxArray = array[:]
    mergeSortHelp(array, 0, len(array) - 1, auxArray)
    return array


def mergeSortHelp(mainArray, startIndex, endIndex, auxArray):
    if startIndex == endIndex:
        return
    middleIndex = (startIndex + endIndex) // 2
    mergeSortHelp(auxArray, startIndex, middleIndex, endIndex, mainArray)
    mergeSortHelp(auxArray, middleIndex + 1, endIndex mainArray)
    merge(mainArray, startIndex, middleIndex, endIndex, auxArray)


def merge(mainArray, startIndex, middleIndex, endIndex, auxArray):
    s = startIndex
    s2 = startIndex
    m = middleIndex + 1
    while s2 <= middleIndex and m <= endIndex:
        if auxArray[s2] <= auxArray[m]:
            mainArray[s] = auxArray[s2]
            s2 += 1
        else:
            mainArray[s] = auxArray[m]
            m += 1
        s += 1
    while s2 <= middleIndex:
        mainArray[s] = auxArray[s2]
        s2 +=1
        s +=1
    while m <= endIndex:
        mainArray[s] = auxArray[m]
        m += 1
        s += 1
 