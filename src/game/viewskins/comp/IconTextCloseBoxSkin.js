var skins;
(function (skins) {
	var IconTextCloseBoxSkin=(function (_super) {
		__extends(IconTextCloseBoxSkin, _super);
		function IconTextCloseBoxSkin() {
			_super.call(this);
			
			this.minHeight = 230;
			this.minWidth = 450;
			this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.btnClose_i()];
		}
		var _proto = IconTextCloseBoxSkin.prototype;
	
		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.bottom = 0;
			t.left = 0;
			t.right = 0;
			t.source = "base_box_bg";
			t.top = 0;
			return t;
		};
		_proto.moveArea_i = function () {
			var t = new eui.Group();
			this.moveArea = t;
			t.height = 45;
			t.left = 0;
			t.right = 0;
			t.top = 0;
			t.elementsContent = [this.titleDisplay_i()];
			return t;
		};
		_proto.titleDisplay_i = function () {
			var t = new ();
			t.horizontalCenter = 0;
			t.source = tit_txt_g_equipCopy;
			t.text = tit_txt_g_equipCopy;
			t.verticalCenter = 0;
			return t;
		};
		_proto.btnClose_i = function () {
			var t = new eui.Button();
			this.btnClose = t;
			t.label = "close";
			t.skinName = "skins.CloseSkin";
			t.x = 406;
			t.y = 4;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["titleDisplay","moveArea","btnClose"];
			},
			enumerable: true,
			configurable: true
		});
		return IconTextCloseBoxSkin;
	})(eui.Skin);
})(skins || (skins = {}));