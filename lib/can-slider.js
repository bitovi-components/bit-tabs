import can from "can";
import stache from "can/view/stache/";
import util from "./util";
import template from "./template.stache!";

export default can.Component.extend({
	tag: "can-slider",
	template: template
});
