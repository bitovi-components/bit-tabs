import QUnit from "steal-qunit";
import {BitPanelVM, BitTabsVM} from "bit-tabs";
import can from "can";
import $ from "jquery";
import F from "funcunit";

F.attach(QUnit);

QUnit.module("bit-tabs view model");

QUnit.test("basics", function(){
	var tabsVM = new BitTabsVM();
	var panelVM = new BitPanelVM();
	tabsVM.addPanel(panelVM);
	
	equal(panelVM.attr("active"), true, "first panel added is active");
});

var template = can.stache("<bit-tabs><bit-panel title='First'>Hello!</bit-panel><bit-panel title='Second'>Another</bit-panel></bit-tabs>");

QUnit.module("bit-tabs component",{
	setup: function(){
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(){
  F("bit-tabs ul li").text(/First/, "has text");
});

QUnit.test("clicking works", function(){
  F("bit-tabs li:nth(1)").click();
  F("bit-panel:nth(1)").text("Another", "Correct text shown");
});
