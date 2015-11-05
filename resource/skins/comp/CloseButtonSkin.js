var skins;
(function (skins) {
	var CloseSkin=(function (_super) {
		__extends(CloseSkin, _super);
		function CloseSkin() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","btn_close_1")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","alpha",0.5)
					])
			];
		}
		var _proto = CloseSkin.prototype;
	
		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "btn_close_0";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return CloseSkin;
	})(eui.Skin);
})(skins || (skins = {}));