
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/mana/components/BaseComponent.js",
	"bin-debug/game/view/common/MainUI.js",
	"bin-debug/mana/components/BaseBox.js",
	"bin-debug/game/view/map/IcoTextBox.js",
	"bin-debug/mana/components/BaseScene.js",
	"bin-debug/game/view/map/MapScene.js",
	"bin-debug/Globle.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/mana/collection/CollectionEvent.js",
	"bin-debug/mana/collection/IUniqueItem.js",
	"bin-debug/mana/core/BaseModel.js",
	"bin-debug/mana/collection/UniqueCollection.js",
	"bin-debug/mana/components/BaseButton.js",
	"bin-debug/mana/components/BaseLabel.js",
	"bin-debug/mana/components/BaseTip.js",
	"bin-debug/mana/components/IconLabel.js",
	"bin-debug/mana/core/MemoryCache.js",
	"bin-debug/mana/core/ModelManager.js",
	"bin-debug/mana/core/Singleton.js",
	"bin-debug/mana/core/SysManager.js",
	"bin-debug/mana/core/TipManager.js",
	"bin-debug/mana/events/CompEvent.js",
	"bin-debug/mana/events/CusEvent.js",
	"bin-debug/mana/net/BaseMsg.js",
	"bin-debug/mana/net/Messager.js",
	"bin-debug/mana/utils/BaseUtil.js",
	"bin-debug/mana/utils/BoxUtil.js",
	"bin-debug/mana/utils/CommonUtil.js",
	"bin-debug/mana/utils/InstanceCacheUtil.js",
	"bin-debug/mana/utils/LayerUtil.js",
	"bin-debug/mana/utils/MouseHoldUtil.js",
	"bin-debug/mana/utils/MsgUtil.js",
	"bin-debug/mana/utils/SceneUtil.js",
	"bin-debug/mana/utils/StringUtil.js",
	"bin-debug/mana/utils/StyleUtil.js",
	"bin-debug/mana/utils/TimerUtil.js",
	"bin-debug/SysTest.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ttt/BubUtil.js",
	"bin-debug/ttt/S01BaseBox.js",
	"bin-debug/ttt/SceneUtil.js",
	"bin-debug/ttt/StrParseUtil.js",
	"bin-debug/ttt/TipUtil.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};