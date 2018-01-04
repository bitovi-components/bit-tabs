import DefineMap from "can-define/map/map";
import DefineList from "can-define/list/list";
import stache from "can-stache";
import Component from "can-component";
import util from "./util";
import tabsStache from "./tabs.stache";
import panelStache from "./panel.stache";
import canViewModel from "can-view-model";

export var BitPanelVM = DefineMap.extend({
	connectedCallback(element) {
		canViewModel(element.parentNode).addPanel(this);
	},
	disconnectedCallback(element) {
		canViewModel(element.parentNode).removePanel(this);
	},
	title: "string",
	active: {
		value: false
	}
});

Component.extend({
	tag:"bit-panel",
	view: panelStache,
	ViewModel: BitPanelVM
});

export var BitTabsVM = DefineMap.extend({
	active: "any",
	// Contains a list of all panel scopes within the
	// tabs element.
	panels: {
		value: []
	},
	// The tabsClass gets set up as the class attribute on the ul
	// containing the tabs.
	tabsClass: "string",
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

Component.extend({
	tag: "bit-tabs",
	view: tabsStache,
	ViewModel: BitTabsVM
});
