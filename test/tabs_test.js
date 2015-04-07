import QUnit from "steal-qunit";
import {BitPanelVM, BitTabsVM} from "bit-tabs";
import can from "can";
import $ from "jquery";

QUnit.module("bit-tabs view model");

QUnit.test("basics", function(){
	var tabsVM = new BitTabsVM();
	var panelVM = new BitPanelVM();
	tabsVM.addPanel(panelVM);
	
	equal(panelVM.attr("active"), true, "first panel added is active");
});

var template = can.stache("<bit-tabs><bit-panel title='First'>Hello!</bit-panel></bit-tabs>");

QUnit.module("bit-tabs component",{
	setup: function(){
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(){
	QUnit.equal( $.trim( $("bit-tabs ul li").text() ),"First", "has text");
});
