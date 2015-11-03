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
		t.elementsContent = [this._Button1_i(),this._Button2_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 41;
		t.y = 545;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 322;
		t.y = 544;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return MapSceneSkin;
})(eui.Skin);