import { PolymerElement, html, Polymer } from "../aw_polymer_3/polymer/polymer-element.js";

/**
 * Componente de panel supletorio
 * 
 * @cssprop --help-panel-background-color
 * @cssprop --help-panel-icon-close-color
 * @cssprop --help-panel-scrollbar-background-color
 * @cssprop --help-panel-scrollbar-color
 * @cssprop --help-panel-scrollbar-color-hover
 * @cssprop --help-panel-scrollbar-width
 */
class AwHelpPanel extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                position: relative;
                z-index: 1;
            }
            .background {
                background-color: var(--help-panel-background-color, rgba(10,10,10,.4));
                display: none;
                height: 100vh;
                left: 0;
                position: fixed;
                top: 0;
                width: 100vw;
            }
            .container {
                background-color: white;
                height: 100vh;
                overflow-x: hidden;
                overflow-y: auto;
                position: fixed;
	            scrollbar-color: var(--help-panel-scrollbar-color, #bbbbbb) var(--help-panel-scrollbar-background-color, #fafafa);
                scrollbar-width: thin;
                right: -100%;
                top: 0;
                width: 400px;
            }
            .container::-webkit-scrollbar {
                width: var(--help-panel-scrollbar-width, 8px);
                height: var(--help-panel-scrollbar-width, 8px);
                background-color: var(--help-panel-scrollbar-background-color, #fafafa);
            }
            .container::-webkit-scrollbar-track {
                background-color: var(--help-panel-scrollbar-background-color, #fafafa);
            }
            .container::-webkit-scrollbar-thumb {
                background-color: var(--help-panel-scrollbar-color, #bbbbbb);
                border-radius: 0px;
	        }
            .container::-webkit-scrollbar-thumb:hover {
                background-color: var(--help-panel-scrollbar-color-hover, #999999);
            }
            .iconButton {
                position: absolute;
                top: 4px; 
                right: 4px;
            }
            .iconButton iron-icon {
                width: 26px;
                height: 26px;
                fill: var(--help-panel-icon-close-color, #333);
                cursor: pointer;
                transition: opacity .3s;
            }
            .iconButton iron-icon:hover {
                opacity: .8;
            }
        </style>
        <div id="background" class="background" on-click="_close"></div>
        <div id="container" class="container">
            <slot></slot>
            <template is="dom-if" if="[[!persistant]]">
                <div class="iconButton">
                    <iron-icon icon="close" on-click="_close"></iron-icon>
                </div>
            </template>
        </div>
        `;
    }

    static get properties() {
        return {
            /** El elemento será persistente y solo se podrá cerrar llamando a la función close() */
            persistant: { type: Boolean },
        }
    }

    /**
     * @method  constructor
     */
    constructor() {
        super();

        this.persistant = false;
        this.isOpen = false;
    }

    /**
     * @method  connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();
        
        // Resolvemos el componente
        this.removeAttribute( "unresolved" )
    }

    /**
     * @method  disconectedCallback
     */
    disconectedCallback() {
        super.disconectedCallback();
    }

    /**
     * @method  close
     */
    close() {
        Polymer.Fade.out(this.$.background, {
            speed: 400
        });

        Polymer.Animate(this.$.container, {
            right: `-100%`,
            boxShadow: `none`
        }, {
            speed: 250
        }, () => {
            this.isOpen = false;
        })
    }

    /**
     * @method  open
     */
    open(width = 400) {
        if(this.isOpen) {
            return;
        }

        this.$.container.style.width = width + "px";

        Polymer.Fade.in(this.$.background, {
            speed: 300
        });

        Polymer.Animate(this.$.container, {
            right: `0`,
            boxShadow: `0 0 5px #777`
        }, {
            speed: 300
        }, () => {
            this.isOpen = true;
        })
    }

    /**
     * @method  _close
     */
    _close() {
        if(!this.isOpen || this.persistant) {
            return;
        }

        this.close();
    }
}

window.customElements.define("aw-help-panel", AwHelpPanel);