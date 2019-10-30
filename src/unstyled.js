import DefineMap from "can-define/map/map";
import DefineList from "can-define/list/list";
import stache from "can-stache";
import Component from "can-component";
import tabsStache from "./tabs.stache";
import panelStache from "./panel.stache";
import canViewModel from "can-view-model";
import ObservableArray from "can-observable-array";
import StacheElement from "can-stache-element";
import type from "can-type";

export class BitPanel extends StacheElement {
	static get view() {
		return panelStache;
	}

	static get props() {
		return {
			content: Function,
			title: String,
			active: false
		};
	}

	connected() {
		this.parentNode.addPanel(this);

		return () => {
			this.parentNode.removePanel(this);
		};
	}
}

customElements.define("bit-panel", BitPanel);

/*
export var BitPanelVM = DefineMap.extend({
	connectedCallback(element) {
		canViewModel(element.parentNode).addPanel(this);

		return () => {
			canViewModel(element.parentNode).removePanel(this);
		}
	},
	title: "string",
	active: {
		default: false
	}
});

Component.extend({
	tag:"bit-panel",
	view: panelStache,
	ViewModel: BitPanelVM
});
*/

export class BitTabs extends StacheElement {
	static get view() {
		return tabsStache;
	}

	static get props() {
		return {
			active: type.Any,
			bitPanels: type.Any,

			/*
			 * Contains a list of all panel scopes within the
			 * tabs element.
			 */
			panels: {
				get default() {
					return new ObservableArray();
				}
			},

			/**
			 * The tabsClass gets set up as the class attribute on the ul
			 * containing the tabs.
			 */
			tabsClass: ""
		};
	}

	/*
	 * When a `<panel>` element is inserted into the document,
	 * it calls this method to add the panel's scope to the
	 * panels array.
	 */
	addPanel(panel){
		// If this is the first panel, activate it.
		if( this.panels.length === 0 ) {
			this.makeActive(panel);
		}
		this.panels.push(panel);
	}

	/*
	 * When a `<panel>` element is removed from the document,
	 * it calls this method to remove the panel's scope from
	 * the panels array.
	 */
	removePanel(panel){
		var panels = this.panels;
		panels.splice(panels.indexOf(panel),1);
		// if the panel was active, make the first item active
		if(panel === this.active){
			if(panels.length){
				this.makeActive(panels[0]);
			} else {
				this.active = undefined;
			}
		}
	}

	makeActive(panel){
		this.active = panel;
		this.panels.forEach(function(panel){
			panel.active = false;
		});
		panel.active = true;
	}

	/*
	 * this is scope, not mustache
	 * consider removing scope as arg
	 */
	isActive(panel) {
		return this.active == panel;
	}
}

/*
export var BitTabsVM = DefineMap.extend({
	active: "any",
	// Contains a list of all panel scopes within the
	// tabs element.
	panels: {
		default() {
			return [];
		}
	},
	// The tabsClass gets set up as the class attribute on the ul
	// containing the tabs.
	tabsClass: { type: "string", default: "" },
	// When a `<panel>` element is inserted into the document,
	// it calls this method to add the panel's scope to the
	// panels array.
	addPanel: function(panel){
		// If this is the first panel, activate it.
		if( this.panels.length === 0 ) {
			this.makeActive(panel);
		}
		this.panels.push(panel);
	},
	// When a `<panel>` element is removed from the document,
	// it calls this method to remove the panel's scope from
	// the panels array.
	removePanel: function(panel){
		var panels = this.panels;
		panels.splice(panels.indexOf(panel),1);
		// if the panel was active, make the first item active
		if(panel === this.active){
			if(panels.length){
				this.makeActive(panels[0]);
			} else {
				this.active = undefined;
			}
		}
	},
	makeActive: function(panel){
		this.active = panel;
		this.panels.forEach(function(panel){
			panel.active = false;
		});
		panel.active = true;
	},
	// this is scope, not mustache
	// consider removing scope as arg
	isActive: function(panel) {
		return this.active == panel;
	}
});
*/

customElements.define("bit-tabs", BitTabs);

/*
export default Component.extend({
	tag: "bit-tabs",
	view: tabsStache,
	ViewModel: BitTabsVM
});
*/
