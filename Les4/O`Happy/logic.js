function random(array) //функция выбирает рандомный вопрос из пака, выводит его и исключает из дальнейшей выборки
{
	let random = Math.floor(Math.random() * array.length);
	return array.splice(random, 1);
};

function game(array, i, s, f) {
	while (i < f && i >= s) {
		ok = false
		var z = random(array);
		while (!ok) {
			event = +prompt(z[0].text + z[0].a1 + z[0].a2 + z[0].a3 + z[0].a4 + '-1 - Выход из игры');
			if (event == -1) {
				break;
			} else if (event != z[0].correct) {
				if (event >= 1 && event <= 4) {
					alert('Вы не дали верного ответа, вы проиграли');
					break;
				} else {
					ok = isAnswer(event);
				}
			} else
				ok = true;
		}
		if (event == z[0].correct) {
			alert("Вы угадали!");
			++i;
			alert("Ваш выигрыш: " + money(i) + "рублей");
		} else
			break;
	}
	return i;
}

function money(i) {
	var sum = (2 ** i) * 100;
	return sum
}

var event, ok, s, f, i = 0;

i = game(easy, i, 0, 5);

i = game(hard, i, 5, 8);

if (i == 8) {
	alert("Поздравляю вы ответили на все вопросы!");
}

alert('Спасибо за игру');

//------------------------------------------
function isAnswer(event) {
	if (isNaN(event) || !isFinite(event)) {
		alert('Вы ввели недопустимый символ');
		return false;
	} else if (event < 1 || event > 4) {
		alert('Ваше число выходит из допустимого диапазона');
		return false;
	}
	return true;

}
