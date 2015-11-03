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