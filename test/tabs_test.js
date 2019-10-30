import QUnit from "steal-qunit";
import {BitPanelVM, BitTabsVM} from "bit-tabs";
import stache from "can-stache";
import $ from "jquery";
import F from "funcunit";

F.attach(QUnit);

QUnit.module("bit-tabs view model");

QUnit.test("basics", function(assert) {
	var tabsVM = new BitTabsVM();
	var panelVM = new BitPanelVM();
	tabsVM.addPanel(panelVM);

	assert.equal(panelVM.active, true, "first panel added is active");
});

var template = stache("<bit-tabs tabsClass:from='\"nav nav-tabs\"'><bit-panel title:from='\"First\"'>Hello!</bit-panel><bit-panel title:from='\"Second\"'>Another</bit-panel></bit-tabs>");

QUnit.module("bit-tabs component",{
	beforeEach: function(assert) {
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(assert) {
  F("bit-tabs ul li").text(/First/, "has text");
  F("bit-tabs ul").hasClass("nav", true).hasClass("nav-tabs", true, "tabsClass gets assigned to ul");
  F("bit-tabs ul li").hasClass("active", true, "first tab has active class");
});

QUnit.test("clicking works", function(assert) {
  F("bit-tabs li:nth(1)").click();
  F("bit-panel:nth(1)").text("Another", "Correct text shown");
});
