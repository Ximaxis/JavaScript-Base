var event, ok, userChoice, i, step = 0,
	memory = [];



function answer() {
	var i = +prompt('Введите номер вопроса(1-3) для просмотра введеных вами ответов');
	if (i <= 3) {
		alert(memory[i - 1].base + '\n' + 'Ваш Ответ: \n' + memory[i - 1].res)
	} else {
		alert('Такого вопроса нет.');
	}
}

select(works.a00, works.a1, works.a2, works.a0);
switch (event) {
	case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
		select(works.b00, works.b1, works.b2, works.b0);
		switch (event) {
			case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
				select(works.d00, works.d1, works.d2, works.d0);
				break;
			case 2: // Второе действие   Если ввели 2 то также переходим на 4 окно
				select(works.d00, works.d1, works.d2, works.d0);
				break;
			case -1: // Второе действие
				break;
			default:
				alert('Ошибка');
		}
		answer();
		break;
	case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
		select(works.c00, works.c1, works.c2, works.c0);
		switch (event) {
			case 1: // Второе действие
				select(works.d00, works.d1, works.d2, works.d0);
				break;
			case 2: // Второе действие
				select(works.d00, works.d1, works.d2, works.d0);
				break;
			case -1: // Второе действие
				break;
			default:
				alert('Ошибка');
		}
		answer();
		break;
	case -1: // Первое действие
		break;
	default:
		alert('Ошибка');
}

function select(ques, a1, a2, max) {
	do {
		ok = false;
		event = +prompt(ques + a1 + a2 + '-1 - Выход из игры');
		if (event == -1) {
			return ok = true;
		} else {
			ok = isAnswer(max, event);
			if (event == 1) {
				userChoice = a1;
			} else {
				userChoice = a2;
			}
			memory[step] = {
				base: ques,
				res: userChoice
			}
			step++;
		}
	} while (!ok);
}


alert('Спасибо за игру');

//------------------------------------------
function isAnswer(q, event) {
	if (isNaN(event) || !isFinite(event)) {
		alert('Вы ввели недопустимый символ');
		return false;
	} else if (event < 1 || event > q) {
		alert('Ваше число выходит из допустимого диапозона');
		return false;
	}
	return true;

}
