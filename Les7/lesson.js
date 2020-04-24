function diff() { //задаем сложность
	while (!ok) {
		var ok = false;
		var i = +prompt('Выберете сложность(1-3) \n она влияет на скорость змейки \n чем выше цифра тем быстрее змейка');
		if ((i <= 3)||(i < 0)) {
			ok = true;

	} else {
		alert('Неверно выбрана сложность.');}
	}
	var z = 0
	switch(i){
				case 1:
					z = 250;
				break;
				case 2:
					z = 200;
				break;
				case 3:
					z = 150;
				break;}
	return (z)
}
	
// Глобальные переменные: 
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = diff(); // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var block_timer; // Таймер для блоков
var score = 0; // Результат
	

	
function init() {
    prepareGameField(); // Генерация поля

    var wrap = document.getElementsByClassName('wrap')[0];
   
    wrap.style.width = '500px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
	
	var speeds = document.getElementById("snake-speed");
speeds.innerText = "Скорость змейки: " + (Math.abs(((SNAKE_SPEED - 100)/50 - 4)));
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table ');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
	s = document.getElementById('snake-start');
	p = s.classList.toggle("hidden");
	s = document.getElementById('snake-renew');
	p = s.classList.toggle("hidden");
	ClearСlock();
    gameIsRunning = true;
	StartStop();
    respawn();//создали змейку
    snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
    setTimeout(() => createFood('food-unit'), 3000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y-1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length-1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
		if (new_unit == undefined) {
			new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X - 1))[0];
		}
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
		if (new_unit == undefined) {
			new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + 0)[0];
		}
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
		if (new_unit == undefined) {
			new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y - 1) + '-' + (coord_x))[0];
		}
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
		if (new_unit == undefined) {
			new_unit = document.getElementsByClassName('cell-' + 0 + '-' + (coord_x))[0];
		}
    }

    // Проверки
    // 1) new_unit не часть змейки
    if (!isSnakeUnit(new_unit)) {
        // Добавление новой части змейки
		
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
       
	   if (!haveFood(new_unit)) {
            // Находим хвост
           var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');
			
            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {//проверка, что змейка не попала сама в себя в новой ячейке
    var check = false;
	let unit_classes = unit.getAttribute('class').split(' ');
    if ((snake.includes(unit)) || (unit_classes.includes('block-unit'))) {//если в змейке содержится новая ячейка, значит возникло пересечение
        check = true;
    }
	
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood('food-unit');
        score++;
		let elem = document.getElementById("snake-score");
        elem.innerText = "Счёт " + score;
		if (score % 3 == 0){
		createFood('block-unit');
		}
		
		
    }
    return check;
}

/**
 * Создание еды
 */
function createFood(s) {
    var foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if ((!food_cell_classes.includes('snake-unit'))||(!food_cell_classes.includes('food-unit'))) {
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + s);
            foodCreated = true;
        }
    }
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
	
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
	StartStop()
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;


/* 
Часть кода с генерацией таймера 
*/

var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  init = 0;

//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = '00:00:00';
  readouts = document.getElementById("snake-time");
	readouts.innerText = "Времени прошло: " + readout
}

//функция для старта секундомера
function StartTIME() {
  var cdateObj = new Date();
  var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s++;
  }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = '0' + dh;
    }
  } else {
    dh = '00';
  }
  readout = dh + ':' + dm + ':' + ds;
	readouts = document.getElementById("snake-time");
	readouts.innerText = "Времени прошло: " + readout
  clocktimer = setTimeout("StartTIME()", 1);
}
function StartStop() {
  if (init == 0) {
    ClearСlock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
}