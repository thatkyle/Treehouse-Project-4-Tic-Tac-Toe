const finish = document.getElementById("finish");
const start = document.getElementById("start");
const board = document.getElementById("board");
const startButton = document.querySelector("#start .button");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const grid = document.querySelector(".boxes");
const cells = document.querySelectorAll(".box");
const finishMessage = document.querySelector("#finish .message");
const newGameButton = document.querySelector("#finish .button");

finish.style.display = "none";
start.style.display = "block";
board.style.display = "none";

startButton.onclick = e => {
	start.style.display = "none";
	board.style.display = "block";
	player2.classList.remove("active");
	player1.classList.add("active");
};

newGameButton.onclick = e => {
	finish.style.display = "none";
	board.style.display = "block";
	player2.classList.remove("active");
	player1.classList.add("active");
	finishMessage.classList.remove("screen-win-two");
	finishMessage.classList.remove("screen-win-one");
	finishMessage.classList.remove("screen-win-tie");
	Object.values(cells).forEach(cell => {
		cell.classList.remove("box-filled-1");
		cell.classList.remove("box-filled-2");
		cell.classList.remove("box-hover-1");
		cell.classList.remove("box-hover-2");
	})
};

const sum = arr => arr.reduce((a, b) => a + b, 0);

const checkLine = line => {
	if ( line.indexOf(0) == -1 ) {
		if (sum(line) == 3) {
			board.style.display  = "none";
			finishMessage.innerText = "Player 1 Wins";
			finishMessage.classList.add("screen-win-one")
			finish.style.display = "block";
		} else if (sum(line) == 6) {
			board.style.display  = "none";
			finishMessage.innerText = "Player 2 Wins";
			finishMessage.classList.add("screen-win-two")
			finish.style.display = "block";
		}
	}
}

grid.addEventListener("mouseover", e => {
	if ( e.target.classList.value.includes("box") && 
		! e.target.classList.value.includes("box-filled-1") &&
		! e.target.classList.value.includes("box-filled-2")
		) {
		if ( player1.classList.value.includes("active") ) {
			e.target.classList.add("box-hover-1");
			let left = e.relatedTarget;
			left.classList.remove("box-hover-1");
		} else {
			e.target.classList.add("box-hover-2");
			let left = e.relatedTarget;
			left.classList.remove("box-hover-2");
		}
	}
})

grid.addEventListener("mouseout", e => {
	if ( e.target.classList.value.includes("box") && 
		(e.target.classList.value.includes("box-hover-1") ||
		e.target.classList.value.includes("box-hover-2"))
		) {
		if ( player1.classList.value.includes("active") ) {
			e.target.classList.remove("box-hover-1");
		} else {
			e.target.classList.remove("box-hover-2");
		}
	}
})

grid.onclick = e => {
	if ( e.target.classList.value.includes("box") && 
		! e.target.classList.value.includes("box-filled-1") &&
		! e.target.classList.value.includes("box-filled-2")
		) {
		if ( player1.classList.value.includes("active") ) {
			e.target.classList.add("box-filled-1");
			e.target.classList.remove("box-hover-1");
			player1.classList.remove("active");
			player2.classList.add("active");
		} else {
			e.target.classList.add("box-filled-2");
			e.target.classList.remove("box-hover-2");
			player2.classList.remove("active");
			player1.classList.add("active");
		}
		let gridcheck = [];
		Object.values(cells).forEach(cell => {
			if (cell.classList.value.includes("box-filled-1")) {
				gridcheck.push(1);
			} else if (cell.classList.value.includes("box-filled-2")) {
				gridcheck.push(2);
			} else {
				gridcheck.push(0);
			}
		})
		checkLine(gridcheck.slice(0,3));
		checkLine(gridcheck.slice(3,6));
		checkLine(gridcheck.slice(6));
		checkLine([gridcheck[0], gridcheck[3], gridcheck[6]]);
		checkLine([gridcheck[1], gridcheck[4], gridcheck[7]]);
		checkLine([gridcheck[2], gridcheck[5], gridcheck[8]]);
		checkLine([gridcheck[0], gridcheck[4], gridcheck[8]]);
		checkLine([gridcheck[2], gridcheck[4], gridcheck[6]]);
		if ((gridcheck.indexOf(0) == -1) && board.style.display == "block") {
			board.style.display  = "none";
			finishMessage.innerText = "Draw";
			finishMessage.classList.add("screen-win-tie")
			finish.style.display = "block";
		}
	}
}

