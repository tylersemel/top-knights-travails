const GRAPH_WIDTH = 8;

function printPath(path) {
  console.log("=> You made it in " + path.length + " moves! Here's your path:");
  for (let i = 0; i < path.length; i++) {
    console.log(path[i]);
  }
}

//checking to see if coords are within board grid
function getPossibleMoves(x, y) {
  let totalMoves = [
    [x + 2, y + 1],
    [x + 1, y + 2],
    [x - 2, y - 1],
    [x - 1, y - 2],
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 2, y - 1],
    [x + 1, y - 2],
  ];

  let possibleMoves = [];

  for (let i = 0; i < totalMoves.length; i++) {
    let u = totalMoves[i][0];
    let v = totalMoves[i][1];

    if (isValidCoord(u, v)) {
      possibleMoves.push([u, v]);
    }
  }

  return possibleMoves;
}

function createNode(coord, path) {
  if (!isValidCoord(coord[0], coord[1])) {
    return null;
  }

  return { coord, path };
}

function isValidCoord(x, y) {
  return x >= 0 && x < GRAPH_WIDTH && y >= 0 && y < GRAPH_WIDTH;
}

function bfs(start, end) {
  if (!start || !end) return null;

  const [sx, sy] = start;
  const [ex, ey] = end;

  if (sx === ex && sy === ey) return [start];

  //not in the board
  if (!(sx >= 0 && sy < GRAPH_WIDTH && ex >= 0 && ey < GRAPH_WIDTH)) {
    return null;
  }

  const queue = [];
  queue.push(createNode([sx, sy], [[sx, sy]]));

  const visited = [];
  visited.push([sx, sy]);

  while (queue.length > 0) {
    let currentNode = queue.shift();

    if (currentNode.coord[0] == ex && currentNode.coord[1] == ey) {
      return currentNode.path;
    }

    let possibleMoves = getPossibleMoves(
      currentNode.coord[0],
      currentNode.coord[1]
    );

    let moves = possibleMoves.filter((coord) => !visited.includes(coord));

    for (let i = 0; i < moves.length; i++) {
      let u = possibleMoves[i][0];
      let v = possibleMoves[i][1];
      if (!visited.includes([u, v])) {
        visited.push([u, v]);
        let newPath = currentNode.path.concat([possibleMoves[i]]);
        let node = createNode([u, v], newPath);
        if (node) {
          queue.push(node);
        }
      }
    }
  }

  return null;
}

function knightMoves(start, end) {
  let path = bfs(start, end);

  if (!path) {
    console.log("Sorry, that was not a valid path!");
    return;
  }

  printPath(path);
}

knightMoves([0, 0], [7, 7]);
