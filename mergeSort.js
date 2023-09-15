function mergeSort(array) {
    if (array.lenght <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelp(array, 0, array.lenght - 1, auxArray);
    return array;
}


function mergeSortHelp(mainArray, startIndex, endIndex, auxArray) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelp(auxArray, startIndex, middleIndex, mainArray);
    mergeSortHelp(auxArray, middleIndex + 1, endIndex, mainArray);
    mergeSort(mainArray, startIndex, middleIndex, endIndex, auxArray);
}


function merge(mainArray, startIndex, middleIndex, endIndex, auxArray) {
    let s = startIndex;
    let s2 = startIndex;
    let m = middleIndex + 1;
    while (s2 <= middleIndex && m <= endIndex) {
        if (auxArray[s2] <= auxArray[m]) {
            mainArray[s++] = auxArray[s2++];
        } else {
            mainArray[s++] = auxArray[m++];
        }
    }
    while (s2 <= middleIndex) {
        mainArray[s++] = auxArray[s2++];
    }
    while (m <= endIndex) {
        mainArray[s++] = auxArray[m++];
    }
}
