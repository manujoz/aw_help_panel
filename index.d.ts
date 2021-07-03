interface AwHelpPanel extends HTMLElement {
	/** Un componente persistente no está disponible para cerrarse por el usuario, tan solo se cerrará a través de javascript con la functión close() */
	persistant: boolean;

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