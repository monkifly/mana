var skins;
(function (skins) {
	var IcoTextCloseBoxSkin=(function (_super) {
		__extends(IcoTextCloseBoxSkin, _super);
		function IcoTextCloseBoxSkin() {
			_super.call(this);
			
			this.minHeight = 230;
			this.minWidth = 450;
			this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
		}
		var _proto = IcoTextCloseBoxSkin.prototype;
	
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
			t.elementsContent = [this.icoTitleDisplay_i()];
			return t;
		};
		_proto.icoTitleDisplay_i = function () {
			var t = new eui.Image();
			this.icoTitleDisplay = t;
			t.horizontalCenter = 0;
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
				return ["icoTitleDisplay","moveArea","closeButton"];
			},
			enumerable: true,
			configurable: true
		});
		return IcoTextCloseBoxSkin;
	})(eui.Skin);
})(skins || (skins = {}));