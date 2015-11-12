var MainUISkin=(function (_super) {
	__extends(MainUISkin, _super);
	function MainUISkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Button1_i(),this._Button2_i(),this._Button3_i(),this._Group1_i()];
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
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 716;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn1_i(),this.btn2_i(),this.btn3_i(),this.btn4_i(),this.btn5_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.height = 80;
		t.label = "按钮";
		t.width = 80;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new eui.Button();
		this.btn2 = t;
		t.height = 80;
		t.label = "按钮";
		t.width = 80;
		t.x = 76;
		t.y = 4;
		return t;
	};
	_proto.btn3_i = function () {
		var t = new eui.Button();
		this.btn3 = t;
		t.height = 80;
		t.label = "按钮";
		t.width = 80;
		t.x = 86;
		t.y = 14;
		return t;
	};
	_proto.btn4_i = function () {
		var t = new eui.Button();
		this.btn4 = t;
		t.height = 80;
		t.label = "按钮";
		t.width = 80;
		t.x = 96;
		t.y = 24;
		return t;
	};
	_proto.btn5_i = function () {
		var t = new eui.Button();
		this.btn5 = t;
		t.height = 80;
		t.label = "按钮";
		t.width = 80;
		t.x = 106;
		t.y = 34;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["btn1","btn2","btn3","btn4","btn5"];
		},
		enumerable: true,
		configurable: true
	});
	return MainUISkin;
})(eui.Skin);