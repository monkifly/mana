var MainUISkin=(function (_super) {
	__extends(MainUISkin, _super);
	function MainUISkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Button1_i(),this._Button2_i(),this._Button3_i(),this._Button4_i(),this._Button5_i()];
	}
	var _proto = MainUISkin.prototype;

	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 20;
		t.y = 61;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 208;
		t.y = 66;
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 364;
		t.y = 64;
		return t;
	};
	_proto._Button4_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 206;
		t.y = 729;
		return t;
	};
	_proto._Button5_i = function () {
		var t = new eui.Button();
		t.label = "按钮";
		t.x = 362;
		t.y = 727;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return MainUISkin;
})(eui.Skin);