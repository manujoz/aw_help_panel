interface AwHelpPanel extends HTMLElement {
	/**
	 * @method	close
	 * 
	 * Cierra el panel
	 */
     close(): void;

	/**
	 * @method open
	 * 
	 * Abre el panel
	 * 
	 * @param {string} width Ancho que queremos que tenga el panel
	 */
	open( width: number ) : void;
}

declare var AwHelpPanel: {
	prototype: AwHelpPanel,
	new(): AwHelpPanel
}