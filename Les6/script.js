//		1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие картинки по указанному в src адресу.

let into = document.getElementById("into"),
	s = "";
for (let i = 1; i <= 22; ++i) {
		s += `<a href="img2/${i}.jpg" title="Image ${i}"><img src="img/${i}.jpg" class="slider-img"></a>`;
}
into.innerHTML = s;
//$(document).ready(function () {
//	$('.in>img').click(function () {
//		var src = $(this).prop('src');
//		$('#big_img').html('<img src="' + src + '">'); 
//	});
//});

into.onclick = function(event) {
    var thumbnail = event.target.closest('a');

    if (!thumbnail) return; 
    showLargeImg(thumbnail.href, thumbnail.title);
    event.preventDefault();
}

function showLargeImg(href, title) {
    largeImg.src = href;
    largeImg.alt = title;
    p = document.querySelector('p')
    if (p.childNodes.length > 1) {
        p.removeChild(p.lastChild);
    }
    largeImg.onerror = function(event) {
        event.target.closest('p').innerHTML += "<span>К сожалению, картинка не найдена</span>";
    }
}

//		2. Реализовать модуль корзины.Создать блок товаров и блок корзины.У каждого товара есть кнопка« Купить», при нажатии на которую происходит добавление имени и цены товара в блок корзины.Корзина должна уметь считать общую сумму заказа.
//		3) * Добавить в галерею функцию перехода к следующему изображению.По сторонам от большой картинки должны быть стрелки« вперед» и« назад», по нажатию на которые происходит замена изображения на следующее или предыдущее.

const slider = {
	Images: [],
	CurrentNo: 0,
	IsRun: false,

	Init() {
		this.Images = Array.from(document.querySelector(".slider").querySelectorAll(".slider-img"));
		document.querySelector(".slider-left").addEventListener("click", this.Left.bind(this));
		document.querySelector(".slider-right").addEventListener("click", this.Right.bind(this));
		this.Images.forEach(p => p.style.left = "-100%");
		this.Images[0].style.left = "0";
	},
	Left() {
		if (this.IsRun)
			return;
		this.IsRun = true;
		let curImg = this.Images[this.CurrentNo];
		let nextNo = this.CurrentNo > 0 ? this.CurrentNo - 1 : this.Images.length - 1;
		let nextImg = this.Images[nextNo];
		nextImg.style.left = "100%";

		setTimeout(p => {
			curImg.classList.add("slider-img_move");
			nextImg.classList.add("slider-img_move");
			curImg.style.left = "-100%";
			nextImg.style.left = "0";
		}, 0);
		setTimeout(p => {
			curImg.classList.remove("slider-img_move");
			nextImg.classList.remove("slider-img_move");
			this.CurrentNo = nextNo;
			this.IsRun = false;
		}, 1100);
	},
	Right() {
		if (this.IsRun)
			return;
		this.IsRun = true;
		let curImg = this.Images[this.CurrentNo];
		let nextNo = this.CurrentNo < this.Images.length - 1 ? this.CurrentNo + 1 : 0;
		let nextImg = this.Images[nextNo];
		nextImg.style.left = "-100%";

		setTimeout(p => {
			curImg.classList.add("slider-img_move");
			nextImg.classList.add("slider-img_move");
			curImg.style.left = "100%";
			nextImg.style.left = "0";
		}, 0);
		setTimeout(p => {
			curImg.classList.remove("slider-img_move");
			nextImg.classList.remove("slider-img_move");
			this.CurrentNo = nextNo;
			this.IsRun = false;
		}, 1100);
	}
}

window.addEventListener("load", event => {
	setTimeout(p => document.querySelector(".slider-wait").style.display = "none", 300);
	slider.Init();
});
