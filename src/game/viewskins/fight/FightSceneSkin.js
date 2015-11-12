var FightSceneSkin=(function (_super) {
	__extends(FightSceneSkin, _super);
	function FightSceneSkin() {
		_super.call(this);
		
		this.height = 800;
		this.width = 480;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = FightSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 320;
		t.scale9Grid = new egret.Rectangle(9,9,73,19);
		t.source = "btn_0_5_1";
		t.width = 480;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return FightSceneSkin;
})(eui.Skin);