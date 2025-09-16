const GRAPH_WIDTH = 8;

function findPath(start, end, visited) {}

function printPath(path) {
  console.log("=> You made it in " + path.length + " moves! Here's your path:");
  for (let i = 0; i < path.length; i++) {
    console.log(path[i]);
  }
}

function bfs(start, end) {
  if (!start || !end) return null;

  //not in the board
  if (
    !(
      end[0] >= 0 &&
      end[0] < GRAPH_WIDTH &&
      end[1] >= 0 &&
      end[1] < GRAPH_WIDTH
    )
  ) {
    return null;
  }

  if (start === end) return [start];

  const queue = [];
  queue.push([start[0], start[1]]);

  const visited = [];
  visited.push([start[0], start[1]]);

  const paths = [];

  while (queue.length > 0) {
    let node = queue.shift();

    let possibleMoves = [
      [node[0] + 2, node[1] + 1],
      [node[0] + 1, node[1] + 2],
      [node[0] - 2, node[1] - 1],
      [node[0] - 1, node[1] - 2],
      [node[0] - 2, node[1] + 1],
      [node[0] - 1, node[1] + 2],
      [node[0] + 2, node[1] - 1],
      [node[0] + 1, node[1] - 2],
    ];

    validMoves = [];

    for (let i = 0; i < possibleMoves.length; i++) {
      let u = possibleMoves[i][0];
      let v = possibleMoves[i][1];

      if (u >= 0 && u < GRAPH_WIDTH && v >= 0 && v < GRAPH_WIDTH) {
        let hasVisited = false;
        for (let j = 0; j < visited.length; j++) {
          if (u == visited[j][0] && v == visited[j][1]) {
            hasVisited = true;
          }
        }

        if (!hasVisited) {
          validMoves.push([u, v]);
        }
      }
    }

    //if starting at start node
    if (node[0] == start[0] && node[1] == start[1]) {
      for (let i = 0; i < validMoves.length; i++) {
        paths.push([node]);
        paths[paths.length - 1].push(validMoves[i]);

        if (validMoves[i][0] == end[0] && validMoves[i][1] == end[1]) {
          return paths[paths.length - 1];
        }
      }
    } else {
      let oldPath = [];
      for (let i = 0; i < paths.length; i++) {
        if (
          paths[i][paths[i].length - 1][0] == node[0] &&
          paths[i][paths[i].length - 1][1] == node[1]
        ) {
          oldPath = paths[i];
          paths.splice(i, 1);
          break;
        }
      }

      for (let i = 0; i < validMoves.length; i++) {
        let path = oldPath.concat([validMoves[i]]);
        paths.push(path);

        if (validMoves[i][0] == end[0] && validMoves[i][1] == end[1]) {
          return path;
        }
      }
    }

    for (let i = 0; i < validMoves.length; i++) {
      let u = validMoves[i][0];
      let v = validMoves[i][1];
      queue.push([u, v]);
      visited.push([u, v]);
    }
  }

  return visited;
}

function knightMoves(vertexA, vertexB) {
  let path = bfs(vertexA, vertexB);

  if (!path) {
    console.log("Sorry, that was not a valid path!");
    return;
  }

  printPath(path);
}

knightMoves([0, 0], [4, 7]);
