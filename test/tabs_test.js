import QUnit from "steal-qunit";
import {BitPanel, BitTabs} from "bit-tabs";
import stache from "can-stache";
import $ from "jquery";
import F from "funcunit";

F.attach(QUnit);

QUnit.module("bit-tabs view model");

QUnit.test("basics", function(assert){
	var tabsVM = new BitTabs();
	var panelVM = new BitPanel();
	tabsVM.addPanel(panelVM);

	assert.equal(panelVM.active, true, "first panel added is active");
});

var template = stache(`
	<bit-tabs tabsClass:raw="nav nav-tabs">
		<can-template name="bitPanels">
			<bit-panel title:raw="First">
				<can-template name="content">Hello!</can-template>
			</bit-panel>
			<bit-panel title:raw="Second">
				<can-template name="content">Another</can-template>
			</bit-panel>
		</can-template>
	</bit-tabs>
`);

QUnit.module("bit-tabs component",{
	beforeEach: function(){
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(){
  F("bit-tabs ul li").text(/First/, "has text");
  F("bit-tabs ul").hasClass("nav", true).hasClass("nav-tabs", true, "tabsClass gets assigned to ul");
  F("bit-tabs ul li").hasClass("active", true, "first tab has active class");
});

QUnit.test("clicking works", function(){
  F("bit-tabs li:nth(1)").click();
  F("bit-panel:nth(1)").text("Another", "Correct text shown");
});
