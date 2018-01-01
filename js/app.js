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

var viewModel = function() {
	var self = this;
	self.mapInstance = ko.observable(new mapBaidu());
	self.mapInstance().view.init();
	//	self.cinemaList = ko.observableArray(self.mapInstance().controller.getCinemaList());
	self.cinemaList = ko.observableArray();

	var controller = self.mapInstance().controller;
	controller.getCinemaList().forEach(function(element) {
		self.cinemaList().push(new CinemaInfo(element));
	});

	self.showBlockNav = ko.observable(-1);

	self.filterInput = ko.observable("");

	// operation
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
	}
	
	self.chooseThisCinema = function(liElement){
		self.mapInstance().view.triggerMarker(liElement);
	}
}

ko.applyBindings(new viewModel());