let figures = [{
		Tag: ' &#9817;',
		Pos: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"]
			}, //Пешка
	{
		Tag: '&#9814;',
		Pos: ["A1", "H1", "A8", "H8"]
			}, //Ладья
	{
		Tag: '&#9816;',
		Pos: ["B1", "G1", "B8", "G8"]
			}, //Конь
	{
		Tag: ' &#9815;',
		Pos: ["C1", "F1", "C8", "F8"]
			}, //Слон
	{
		Tag: ' &#9813;',
		Pos: ["D1", "D8"]
			}, //Ферзь
	{
		Tag: ' &#9812;',
		Pos: ["E1", "E8"]
			} //Король
		];

function getFigure(row, col) {
	for (let figure of figures) {
		for (let cell of figure.Pos) {
			if (col == cell.charCodeAt(0) - "A".charCodeAt(0) + 1 && row == parseInt(cell[1])) {
				return figure.Tag;
			}
		}
	}
	return "";
}

function chessBoard() {
	let alpha = "A".charCodeAt(0);
	let num = 8;
	let str = "<table>"
	for (let i = 0; i < 10; i++) {
		str += "<tr>";
		for (let j = 0; j < 10; j++) {
			let tdText = "";
			let tdClass = "";
			if ((i == 0 && j == 0) || (i == 9 && j == 9) || (i == 0 && j == 9) || (i == 9 && j == 0)) {} else if (i == 0 || i == 9) {
				if (i == 0) {
					tdText = String.fromCharCode(alpha++);
					tdClass = "border-hint , rotate";
				} else {
					tdText = String.fromCharCode(alpha++ - 8);
					tdClass = "border-hint";
				}

			} else if (j == 0 || j == 9) {
				if (j == 0) {
					tdText = num = num - 0;
					tdClass = "border-hint";
				} else {
					tdText = num--;
					tdClass = "border-hint  , rotate";
				}
			} else {
				tdClass = (i + j) % 2 == 0 ? "white-Cell" : "black-Cell";
				tdClass += i <= 5 ? " figure-black" : " figure-white";
				tdText = getFigure(i, j);
			}

			if ((i == 0 || i == 8) && j !== 0 && j !== 9)
				tdClass += " border-bottom";
			if ((j == 0 || j == 8) && i !== 0 && i !== 9)
				tdClass += " border-right";
			str += `<td class="${tdClass}">${tdText}</td>`
		}
		str += "</tr>";
	}
	str += "</table>";
	document.body.insertAdjacentHTML("afterbegin", str);
}
chessBoard();
