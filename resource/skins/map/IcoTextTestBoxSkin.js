var IcoTextTestBoxSkin=(function (_super) {
	__extends(IcoTextTestBoxSkin, _super);
	function IcoTextTestBoxSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this.panel_i()];
	}
	var _proto = IcoTextTestBoxSkin.prototype;

	_proto.panel_i = function () {
		var t = new eui.Panel();
		this.panel = t;
		t.horizontalCenter = 0;
		t.skinName = "skins.IconTextCloseBoxSkin";
		t.title = "tit_txt_g_stateCopy";
		t.verticalCenter = 0;
		t.elementsContent = [this._Button1_i(),this._Button2_i(),this._Button3_i(),this._Button4_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.height = 53;
		t.label = "测试";
		t.skinName = "TextButtonSkin";
		t.width = 169;
		t.x = 40;
		t.y = 177;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.label = "测试";
		t.skinName = "TextButtonSkin";
		t.x = 112;
		t.y = 458;
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.icon = "btn_txt_g_attack";
		t.skinName = "IconButtonSkin";
		t.x = 272;
		t.y = 457;
		return t;
	};
	_proto._Button4_i = function () {
		var t = new eui.Button();
		t.height = 56;
		t.icon = "btn_txt_g_attack";
		t.skinName = "IconButtonSkin";
		t.width = 206;
		t.x = 51;
		t.y = 239;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["panel"];
		},
		enumerable: true,
		configurable: true
	});
	return IcoTextTestBoxSkin;
})(eui.Skin);