var AlertBoxSkin=(function (_super) {
	__extends(AlertBoxSkin, _super);
	function AlertBoxSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this.panel_i()];
	}
	var _proto = AlertBoxSkin.prototype;

	_proto.panel_i = function () {
		var t = new eui.Panel();
		this.panel = t;
		t.height = 285;
		t.horizontalCenter = 2;
		t.skinName = "skins.BaseCloseBoxSkin";
		t.width = 400;
		t.y = 186;
		t.elementsContent = [this._Group2_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 55;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.labelContent_i(),this.cbNoTip_i(),this._Group1_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto.labelContent_i = function () {
		var t = new eui.Label();
		this.labelContent = t;
		t.height = 136;
		t.size = 22;
		t.text = "标签";
		t.width = 352;
		t.x = 126;
		t.y = 0;
		return t;
	};
	_proto.cbNoTip_i = function () {
		var t = new eui.CheckBox();
		this.cbNoTip = t;
		t.label = "不再提示";
		t.x = 250;
		t.y = 140;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 168;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btnOk_i(),this.btnCancel_i(),this.btnYes_i(),this.btnNo_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 80;
		return t;
	};
	_proto.btnOk_i = function () {
		var t = new eui.Button();
		this.btnOk = t;
		t.label = "确定";
		t.skinName = "TextButtonSkin";
		t.x = 0;
		t.y = 6;
		return t;
	};
	_proto.btnCancel_i = function () {
		var t = new eui.Button();
		this.btnCancel = t;
		t.label = "取消";
		t.skinName = "TextButtonSkin";
		t.x = 184;
		t.y = 3;
		return t;
	};
	_proto.btnYes_i = function () {
		var t = new eui.Button();
		this.btnYes = t;
		t.label = "是";
		t.skinName = "TextButtonSkin";
		t.x = 79;
		t.y = 3;
		return t;
	};
	_proto.btnNo_i = function () {
		var t = new eui.Button();
		this.btnNo = t;
		t.label = "否";
		t.skinName = "TextButtonSkin";
		t.x = 263;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["labelContent","cbNoTip","btnOk","btnCancel","btnYes","btnNo","panel"];
		},
		enumerable: true,
		configurable: true
	});
	return AlertBoxSkin;
})(eui.Skin);