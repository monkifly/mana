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
		var t = new ();
		t.horizontalCenter = 0;
		t.icoTitle = tit_txt_g_stateCopy;
		t.skinName = skins.IcoTextCloseBoxSkin;
		t.verticalCenter = 0;
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