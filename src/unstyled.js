import CanMap from "can-map";
import "can-list";
import canBatch from "can-event/batch/batch";
import stache from "can-stache";
import Component from "can-component";
import util from "./util";
import tabsStache from "./tabs.stache";
import panelStache from "./panel.stache";
import canViewModel from "can-view-model";

export var BitPanelVM = CanMap.extend({
	active: false
});

Component.extend({
	tag:"bit-panel",
	template: panelStache,
	viewModel: BitPanelVM,
	events: {
		inserted: function(){
      canViewModel(this.element.parentNode).addPanel(this.viewModel);
		},
		removed: function(){
      canViewModel(this.element.parentNode).removePanel(this.scope);
		}
	}
});

export var BitTabsVM = CanMap.extend({
	// Contains a list of all panel scopes within the
	// tabs element.
	panels: [],
	// The tabsClass gets set up as the class attribute on the ul
	// containing the tabs.
	tabsClass:"",
	// When a `<panel>` element is inserted into the document,
	// it calls this method to add the panel's scope to the
	// panels array.
	addPanel: function(panel){
		// If this is the first panel, activate it.
		if( this.attr("panels").length === 0 ) {
			this.makeActive(panel);
		}
		this.attr("panels").push(panel);
	},
	// When a `<panel>` element is removed from the document,
	// it calls this method to remove the panel's scope from
	// the panels array.
	removePanel: function(panel){
		var panels = this.attr("panels");
		canBatch.start();
		panels.splice(panels.indexOf(panel),1);
		// if the panel was active, make the first item active
		if(panel === this.attr("active")){
			if(panels.length){
				this.makeActive(panels[0]);
			} else {
				this.removeAttr("active");
			}
		}
		canBatch.stop();
	},
	makeActive: function(panel){
		this.attr("active",panel);
		this.attr("panels").each(function(panel){
			panel.attr("active", false);
		});
		panel.attr("active",true);

	},
	// this is scope, not mustache
	// consider removing scope as arg
	isActive: function( panel ) {
		return this.attr("active") === panel;
	}
});

Component.extend({
	tag: "bit-tabs",
	template: tabsStache,
	viewModel: BitTabsVM
});
