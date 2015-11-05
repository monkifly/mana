var skins;
(function (skins) {
	var BaseCloseBoxSkin=(function (_super) {
		__extends(BaseCloseBoxSkin, _super);
		function BaseCloseBoxSkin() {
			_super.call(this);
			
			this.minHeight = 230;
			this.minWidth = 450;
			this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
		}
		var _proto = BaseCloseBoxSkin.prototype;
	
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
			t.elementsContent = [this.titleDisplay_i(),this._Image2_i()];
			return t;
		};
		_proto.titleDisplay_i = function () {
			var t = new eui.Label();
			this.titleDisplay = t;
			t.fontFamily = "Tahoma";
			t.left = 15;
			t.right = 5;
			t.size = 20;
			t.textAlign = "center";
			t.textColor = 0xFFFFFF;
			t.verticalCenter = 0;
			t.wordWrap = false;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "icoDisplay";
			t.verticalCenter = 0;
			return t;
		};
		_proto.closeButton_i = function () {
			var t = new eui.Button();
			this.closeButton = t;
			t.label = "close";
			t.skinName = "skins.CloseSkin";
			t.x = 406;
			t.y = 4;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["titleDisplay","moveArea","closeButton"];
			},
			enumerable: true,
			configurable: true
		});
		return BaseCloseBoxSkin;
	})(eui.Skin);
})(skins || (skins = {}));