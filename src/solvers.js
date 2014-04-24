/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  for(var i = 0; i < n; i++){
    solution.push([]);
    for(var k = 0; k < n; k++){
      solution[i][k] = i===k ? 1 : 0;
    }
  }
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for(var i = n; i>0; i--){
    solutionCount *= i;
  }
  return solutionCount;
};


window._copyBoard = function(board) {
  return jQuery.extend(true, {}, board);
};

window._checkQueensConflicts = function(board, x, y){
  // we can skip checking the rows as we guarantee
  // 2 queens will never be added on the same row
  if (board.hasMajorDiagonalConflictAt(x - y)) {
    return true;
  }
  if (board.hasMinorDiagonalConflictAt(x + y)) {
    return true;
  }
  return board.hasColConflictAt(x);
};

window._findNQueensSolutionRec = function(board, rowId) {
  // stop condition
  if (rowId === board.rows().length -1) {
    for (var i = 0; i < board.rows().length; i++) {
      var copiedBoard = _copyBoard(board);
      copiedBoard.rows()[rowId][i] = 1;
      if (!_checkQueensConflicts(copiedBoard, i, rowId)) {
        console.log("FOUND SOLUTION", copiedBoard);
        return copiedBoard;
      }
    }
    // no solutions has been found
    return false;
  }

  // recursive case
  var result = false;
  for (var i = 0; i < board.rows().length; i++) {
    var copiedBoard = _copyBoard(board);
    copiedBoard.rows()[rowId][i] = 1;
    if (!_checkQueensConflicts(copiedBoard, i, rowId)) {
      result = result || _findNQueensSolutionRec(copiedBoard, rowId+1);
    }
  }
  console.log(result);
  return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution.push([]);
    for (var j = 0; j < n; j++) {
      solution[i][j] = 0;
    }
  }
  solution = new Board(solution);
  solution = this._findNQueensSolutionRec(solution, 0);
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var nb = 0;
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix.push([]);
    for (var j = 0; j < n; j++) {
      matrix[i][j] = 0;
    }
  }
  board = new Board(matrix);
  return this._countNQueensSolutionsRec(board, 0);
};



window._countNQueensSolutionsRec = function(board, rowId) {
  // stop condition
  var result = 0;
  if (rowId === board.rows().length -1) {
    for (var i = 0; i < board.rows().length; i++) {
      var copiedBoard = _copyBoard(board);
      copiedBoard.rows()[rowId][i] = 1;
      if (!_checkQueensConflicts(copiedBoard, i, rowId)) {
        result++;
      }
    }
    return result;
    // no solutions has been found
  }

  // recursive case
  for (var i = 0; i < board.rows().length; i++) {
    var copiedBoard = _copyBoard(board);
    copiedBoard.rows()[rowId][i] = 1;
    if (!_checkQueensConflicts(copiedBoard, i, rowId)) {
      result += _countNQueensSolutionsRec(copiedBoard, rowId+1)
    }
  }
  return result;
};









