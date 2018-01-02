var mapBaidu = function() {
	var self = this;
	self.model = {
		cinemaList: [{
				title: "米高梅国际影城-金桥店",
				location: {
					lng: 121.61583,
					lat: 31.285519
				}
			},
			{
				title: "大光明丽盛影城(新大陆广场店)",
				location: {
					lng: 121.524778,
					lat: 31.235405

				}
			},
			{
				title: "星美国际影商城（上海正大IMAX店）",
				location: {
					lng: 121.505899,
					lat: 31.2426

				}
			},
			{
				title: "兰馨电影院",
				location: {
					lng: 121.521574,
					lat: 31.232009

				}
			}, {
				title: "幸福蓝海国际影城-上海三林店",
				location: {
					lng: 121.497595,
					lat: 31.166702

				}
			},
			{
				title: "中影国际影城上海浦东川沙店",
				location: {
					lng: 121.705286,
					lat: 31.189677

				}
			}, {
				title: "金逸国际电影城",
				location: {
					lng: 121.590586,
					lat: 31.206557

				}
			},
			{
				title: "国金百丽宫影院",
				location: {
					lng: 121.50967,
					lat: 31.241182

				}
			}, {
				title: "星美国际影城（外高桥店）",
				location: {
					lng: 121.597386,
					lat: 31.318549

				}
			},
			{
				title: "中影DFC影城",
				location: {
					lng: 121.564138,
					lat: 31.209584

				}
			}
		],
		BMap: null,
		BMapPoints: [],
		BMapMarkers: [],
		BMapInfowindow: {}
	};

	self.controller = {
		setMap: function(v) {
			self.model.BMap = v;
		},
		getMap: function() {
			return self.model.BMap;
		},
		getCinemaList: function() {
			return self.model.cinemaList;
		},
		addBMapPoint: function(v) {
			self.model.BMapPoints.push(v);
		},
		getBMapPoints: function() {
			return self.model.BMapPoints;
		},
		addBMapMarker: function(v) {
			self.model.BMapMarkers.push(v);
		},
		getBMapMarkers: function() {
			return self.model.BMapMarkers;
		},
		addBMapInfowindow: function(key, value) {
			self.model.BMapInfowindow[key] = value;
		},
		getBMapInfowindow: function(key, value) {
			return self.model.BMapInfowindow;
		}
	};

	self.view = {
		init: function() {
			self.view.initMap();
			self.view.initRenderCinemaList();
			self.view.setBestView(self.controller.getBMapPoints());
		},
		initMap: function() {
			var map = new BMap.Map("allmap"); // 创建Map实例
			// map.centerAndZoom("上海", 15);
			// 添加地图类型控件
			map.addControl(new BMap.MapTypeControl({
				mapTypes: [
					BMAP_NORMAL_MAP,
					BMAP_HYBRID_MAP
				]
			}));
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放	

			self.controller.setMap(map);
		},
		initRenderCinemaList: function() {
			self.controller.getCinemaList().forEach(function(e) {
				var point = new BMap.Point(e.location.lng, e.location.lat);
				self.controller.addBMapPoint(point);
				var marker = new BMap.Marker(point);
				marker.setTitle(e.title);
				self.controller.addBMapMarker(marker);
				self.view.renderMarker(marker);
				var infoWindow = self.view.initInfoWindow(e);
				self.controller.addBMapInfowindow(e.title, infoWindow);
				marker.addEventListener("click", function() {
					// this.setAnimation(BMAP_ANIMATION_BOUNCE);
					// this.openInfoWindow(infoWindow);

					self.view.renderBounceMarker(this);
				});
			});
		},
		renderMarker: function(marker) {
			self.controller.getMap().addOverlay(marker);
		},
		renderBounceMarker: function(marker) {
			self.controller.getBMapMarkers().forEach(function(element) {
				if(marker != element) {
					element.setAnimation(null);
					element.closeInfoWindow();
				} else {
					element.setAnimation(BMAP_ANIMATION_BOUNCE);
					element.openInfoWindow(self.controller.getBMapInfowindow()[element.getTitle()]);
				}
			})

			//			self.controller.getMap().addOverlay(marker);
		},
		triggerMarker: function(data) {
			self.controller.getBMapMarkers().forEach(function(element) {
				if(data.title != element.getTitle()) {
					element.setAnimation(null);
				} else {
					self.view.renderBounceMarker(element);
				}
			})

		},
		initInfoWindow: function(cinemaInfo) {
			var title = cinemaInfo.title;
			var location = "经度: " + cinemaInfo.location.lng + ",纬度: " + cinemaInfo.location.lat;
			var content = '<p class="iwContent">';
			content += "<em>坐标：</em>" + location + "";
			content += "</p>";
			var displayTitle = title;
			if(displayTitle.length > 15) {
				displayTitle = displayTitle.substring(0, 12) + "...";
			}
			var ret = new BMap.InfoWindow(content, {
				title: '<span class="iwTitle" title="' + title + '">' + displayTitle + "</span>",
				width: 250
			});
			return ret;
		},
		setBestView: function(bMapPointList) {
			var mapUtil = self.controller.getMap();
			var gvp = mapUtil.getViewport(bMapPointList, {
				enableAnimation: true,
				margins: [20, 20, 20, 20],
				zoomFactor: 0,
				delay: 200
			});

			mapUtil.centerAndZoom(new BMap.Point(gvp.center.lng, gvp.center.lat), gvp.zoom);
		},
		renderFilterMarkers: function(arr) {
			self.controller.getBMapMarkers().forEach(function(e) {
				e.hide();
			})

			for(var i = 0; i < arr.length; i++) {
				if(arr[i].display()) {
					self.controller.getBMapMarkers()[i].show();
					self.controller.getBMapMarkers()[i].setAnimation(BMAP_ANIMATION_DROP);
				}
			}
		}
	};

};

//var mapBaiduInstance = new mapBaidu();
//mapBaiduInstance.view.init();

function test() {
	$.ajax({
		type: "get",
		url: "http://m.maoyan.com/cinemas.json",
		async: true,
		dataType: "jsonp", //指定服务器返回的数据类型
		success: function(data) {
			console.log('get cinema success!!' + JSON.stringify(data));
		},
		error: function(err, status, text) {
			console.log('get cinema error!!' + JSON.stringify({
				'status': status,
				'text': text
			}));
		},
		complete: function() {
			console.log('get cinema complete!!');
		}
	});
}

test();
