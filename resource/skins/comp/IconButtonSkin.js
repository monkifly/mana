var IconButtonSkin=(function (_super) {
	__extends(IconButtonSkin, _super);
	function IconButtonSkin() {
		_super.call(this);
		
		this.elementsContent = [this._Image1_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","btn_0_5_1"),
					new eui.SetProperty("iconDisplay","alpha",0.5)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = IconButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(9,9,75,19);
		t.source = "btn_0_5_0";
		t.top = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["iconDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return IconButtonSkin;
})(eui.Skin);