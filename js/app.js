// rem计算
(function() {
	var docElement = window.document.documentElement;
	var width = getWindowSize().width;
	var calcRem = 10;
	console.log("rem.js 当前宽度：" + width + ",当前像素比:" + window.devicePixelRatio + ",/640:" + width / 640);
	docElement.style.fontSize = calcRem + "px";

	function getWindowSize() {
		var winWidth = 0;
		var winHeight = 0;

		// 获取窗口宽度
		if(window.innerWidth) {
			winWidth = window.innerWidth;
		} else if((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth;
		}

		// 获取窗口高度
		if(window.innerHeight) {
			winHeight = window.innerHeight;
		} else if((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight;
		}

		// 通过深入Document内部对body进行检测，获取窗口大小
		if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}

		return {
			width: winWidth,
			height: winHeight
		};
	}
})();

function CinemaInfo(info) {
	var self = this;
	self.title = info.title;
	self.location = info.location;
	self.display = ko.observable(true);
}

function MovieInfo(info) {
	var self = this;
	self.movieId = info.movieId;
	self.movieName = info.movieName;
	self.pic_url = ko.observable(info.pic_url);
}

var viewModel = function() {
	var self = this;
	self.mapInstance = ko.observable(new mapBaidu());
	self.mapInstance().view.init();
	self.cinemaList = ko.observableArray();
	self.movieList = ko.observableArray();
	self.showBlockNav = ko.observable(-1);
	self.filterInput = ko.observable("");
	self.isDebug = ko.observable(false);
	self.demoMovieBackData = ko.observable({
		"reason": "success",
		"result": [{
			"movieId": "252636",
			"movieName": "邹碧华",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/24/111747.68564573_182X243X4.jpg"
		}, {
			"movieId": "251674",
			"movieName": "咕噜咕噜美人鱼2",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/30/145211.61014619_182X243X4.jpg"
		}, {
			"movieId": "251245",
			"movieName": "小猫巴克里",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/26/093520.94927279_182X243X4.jpg"
		}, {
			"movieId": "250817",
			"movieName": "金珠玛米",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/24/140212.72646910_182X243X4.jpg"
		}, {
			"movieId": "244235",
			"movieName": "七十七天",
			"pic_url": "http://img5.mtime.cn/mt/2017/10/26/151523.80306138_182X243X4.jpg"
		}, {
			"movieId": "242132",
			"movieName": "巨额来电",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/20/171508.38236220_182X243X4.jpg"
		}, {
			"movieId": "240424",
			"movieName": "妖铃铃",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/30/233929.74362351_182X243X4.jpg"
		}, {
			"movieId": "236404",
			"movieName": "芳华",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/09/120449.13626053_182X243X4.jpg"
		}, {
			"movieId": "236250",
			"movieName": "二代妖精之今生有幸",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/08/140249.69394237_182X243X4.jpg"
		}, {
			"movieId": "235736",
			"movieName": "心理罪之城市之光",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/28/221957.66137860_182X243X4.jpg"
		}, {
			"movieId": "235355",
			"movieName": "鲨海",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/30/081658.18048935_182X243X4.jpg"
		}, {
			"movieId": "235012",
			"movieName": "机器之血",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/22/093132.74545225_182X243X4.jpg"
		}, {
			"movieId": "233498",
			"movieName": "相爱相亲",
			"pic_url": "http://img5.mtime.cn/mt/2017/10/17/210424.21162503_182X243X4.jpg"
		}, {
			"movieId": "232987",
			"movieName": "至暗时刻",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/07/094706.43314693_182X243X4.jpg"
		}, {
			"movieId": "230788",
			"movieName": "前任3：再见前任",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/29/100617.38577464_182X243X4.jpg"
		}, {
			"movieId": "229414",
			"movieName": "解忧杂货店",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/26/135855.68927633_182X243X4.jpg"
		}, {
			"movieId": "229372",
			"movieName": "帕丁顿熊2",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/14/102432.20209601_182X243X4.jpg"
		}, {
			"movieId": "227434",
			"movieName": "寻梦环游记",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/02/172158.15874011_182X243X4.jpg"
		}, {
			"movieId": "225829",
			"movieName": "东方快车谋杀案",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/07/164403.84902974_182X243X4.jpg"
		}, {
			"movieId": "224439",
			"movieName": "双面劫匪",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/06/163035.74021107_182X243X4.jpg"
		}, {
			"movieId": "221423",
			"movieName": "至爱梵高·星空之谜",
			"pic_url": "http://img5.mtime.cn/mt/2017/11/23/100131.42638489_182X243X4.jpg"
		}, {
			"movieId": "211981",
			"movieName": "星球大战：最后的绝地武士",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/04/104356.50678359_182X243X4.jpg"
		}, {
			"movieId": "145014",
			"movieName": "妖猫传",
			"pic_url": "http://img5.mtime.cn/mt/2017/12/05/112433.19967305_182X243X4.jpg"
		}],
		"error_code": 0
	});

	// operation
	self.initCinemaList = function() {
		var controller = self.mapInstance().controller;
		controller.getCinemaList().forEach(function(element) {
			self.cinemaList().push(new CinemaInfo(element));
		});
	};

	self.initMovieList = function() {
		if(self.isDebug()) {
			console.log('initMovieList debug mode, use demo data, quit doing ajax');
			var callbackData = self.demoMovieBackData();

			if(callbackData.reason === "success") {
				var movieArr = callbackData.result;
				movieArr.forEach(function(element) {
					self.movieList().push(new MovieInfo(element));
				});

				setTimeout(function() {
					self.renderCinemaList();
				}, 1000);
			}

			return;
		}

		$.ajax({
			url: 'http://v.juhe.cn/movie/movies.today',
			type: 'get',
			data: {
				cityid: 1,
				key: '1481731dbf2da5ffeac735d3465f91b1'
			},
			dataType: 'jsonp',
			success: function(callbackData) {
				console.log('get cinema success:' + JSON.stringify(callbackData));

				if(callbackData.reason === "success") {
					var movieArr = callbackData.result;
					var arr = [];
					movieArr.forEach(function(element) {
						arr.push(new MovieInfo(element));

					});

					self.movieList(arr);
					self.renderCinemaList();
				} else {
					self.movieList(self.demoMovieBackData().result);
					self.renderCinemaList();
				}
			},
			error: function(error, Msgerror) {
				console.log(Msgerror);

				// 应急处理，使用备份数据
				self.movieList(self.demoMovieBackData().result);
				self.renderCinemaList();
			}
		});
	};

	self.filterCinema = function() {
		var txtFilterInput = self.filterInput();
		self.cinemaList().forEach(function(element) {
			element.display((element.title.indexOf(txtFilterInput) >= 0));
			console.log('title: ' + element.title + ", display: " + element.display());
		});

		self.mapInstance().view.renderFilterMarkers(self.cinemaList());
	};

	self.switchNavBlock = function() {
		self.showBlockNav(self.showBlockNav() * -1);
	};

	self.chooseThisCinema = function(liElement) {
		self.mapInstance().view.triggerMarker(liElement);
	};

	self.renderCinemaList = function() {
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	};

	self.initCinemaList();

	self.initMovieList();
};

ko.applyBindings(new viewModel());