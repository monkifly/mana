module mana {
	export module core {
		export class SysManager extends mana.core.Singleton {

			protected _message:mana.net.Messager = Messager.getInstance();

			public constructor()
			{
				super();
			}

		}
	}
}

flash.extendsClass("mana.core.SysManager","mana.core.Singleton")
