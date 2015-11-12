var MapSceneSkin=(function (_super) {
	__extends(MapSceneSkin, _super);
	function MapSceneSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = MapSceneSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 800;
		t.width = 480;
		t.elementsContent = [this.btnTest1_i(),this.btnTest2_i()];
		return t;
	};
	_proto.btnTest1_i = function () {
		var t = new eui.Button();
		this.btnTest1 = t;
		t.label = "Test1";
		t.x = 41;
		t.y = 545;
		return t;
	};
	_proto.btnTest2_i = function () {
		var t = new eui.Button();
		this.btnTest2 = t;
		t.label = "Test2";
		t.x = 322;
		t.y = 544;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["btnTest1","btnTest2"];
		},
		enumerable: true,
		configurable: true
	});
	return MapSceneSkin;
})(eui.Skin);