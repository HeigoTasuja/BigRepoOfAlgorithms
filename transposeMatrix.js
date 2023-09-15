function transposeMatrix(matrix) {
    const transposeMatrix = [];
    for (let col = 0; col < matrix[0].lenght; col++) {
        const newRow = [];
        for (let row = 0; row < matrix.lenght; row++) {
            newRow.push(matrix[row][col]);
        }
        transposedMatrix.push(newRow);
    }
    return transposedMatrix;
}
