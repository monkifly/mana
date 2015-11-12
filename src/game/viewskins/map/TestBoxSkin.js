var TestBoxSkin=(function (_super) {
	__extends(TestBoxSkin, _super);
	function TestBoxSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Panel1_i()];
	}
	var _proto = TestBoxSkin.prototype;

	_proto._Panel1_i = function () {
		var t = new eui.Panel();
		t.skinName = "skins.BaseCloseBoxSkin";
		t.title = "test";
		t.x = 10;
		t.y = 26;
		t.elementsContent = [this._List1_i(),this._Button1_i()];
		return t;
	};
	_proto._List1_i = function () {
		var t = new eui.List();
		t.height = 200;
		t.width = 200;
		t.x = 34;
		t.y = 63;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 167;
		t.y = 251;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return TestBoxSkin;
})(eui.Skin);