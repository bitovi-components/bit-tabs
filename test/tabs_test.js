import QUnit from "steal-qunit";
import {CanPanelVM, CanTabsVM} from "bit-tabs";
import can from "can";
import $ from "jquery";

QUnit.module("bit-tabs view model");

QUnit.test("basics", function(){
	var tabsVM = new CanTabsVM();
	var panelVM = new CanPanelVM();
	tabsVM.addPanel(panelVM);
	
	equal(panelVM.attr("active"), true, "first panel added is active");
});

var template = can.stache("<bit-tabs><can-panel title='First'>Hello!</can-panel></bit-tabs>");

QUnit.module("bit-tabs component",{
	setup: function(){
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(){
	QUnit.equal( $.trim( $("bit-tabs ul li").text() ),"First", "has text");
});
