let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#new-btn");
let msgPlayer = document.querySelector("#msg-player");

let turnO = true; // X O
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("Clicked");
    if (turnO) {
      // player O
      box.innerText = "O";
      turnO = false;
      msgPlayer.innerText = "Player X turn";
      // msgPlayer.classList.remove("hide");
      // console.log("O Player");
    } else {
      box.innerText = "X";
      turnO = true;
      msgPlayer.innerText = "Player O turn";
      // msgPlayer.classList.remove("hide");
      // console.log("X player");
    }
    box.disabled = true;
    count++;

    checkWinner() ? null : count === 9 ? gameDraw() : null;
  });
});

const checkWinner = () => {
  for (let pattern of winPattern) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    let post1Val = boxes[pattern[0]].innerText;
    let post2Val = boxes[pattern[1]].innerText;
    let post3Val = boxes[pattern[2]].innerText;

    if (post1Val != "" && post2Val != "" && post3Val != "") {
      if (post1Val === post2Val && post2Val === post3Val) {
        // console.log("Winner", post1Val);
        showWinner(post1Val);
        return true;
      }
    }
  }
  return false;
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcontainer.classList.remove("hide");
  disabledBoxes();
};

const showWinner = (winner) => {
  msg.innerText = `Congrats, Winner is player ${winner}`;
  msgcontainer.classList.remove("hide");
  disabledBoxes();
};

const resetgame = () => {
  turnO = true;
  count = 0;
  enabledBoxes();
  msgcontainer.classList.add("hide");
};

newGame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
