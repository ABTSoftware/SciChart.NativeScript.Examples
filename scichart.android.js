/**********************************************************************************
 * (c) 2017, Nathanael Anderson.
 * Licensed under the MIT license.
 *
 * Version 1.0.0                                        nathan@master-technology.com
 **********************************************************************************/
'use strict';

/* global com, java, __extends */
console.log("1");

const ContentView = require('ui/content-view').ContentView;
const Application = require('application');
const utils = require('utils/utils');


function SciChart() {
	ContentView.apply(this, arguments);

	this._setup = 0;
	this._xAxis = null;
	this._yAxis = null;
	this._renderSeries = null;
	this._chartType = "SCIFastLineRenderableSeries";
	this._data = null;
	// This is used so that we don't have to re-parse all the data on a chart change
	// Technically it isn't needed other than for speed.
	this._parsedData = null;
	this._newData = false;

	com.scichart.extensions.builders.SciChartBuilder.init(utils.ad.getApplicationContext());
	this.builder = com.scichart.extensions.builders.SciChartBuilder.instance();


}
__extends(SciChart, ContentView);

SciChart.prototype._createUI = function() {
	console.log("This", this._context, utils.ad.getApplicationContext());
	this.nativeView = this._android = new com.scichart.charting.visuals.SciChartSurface(this._context);

	// Setup Axis
	let xAxis = this.builder.newNumericAxis().withGrowBy(0.1, 0.1).withVisibleRange(1.1, 2.7).build();
	let yAxis = this.builder.newNumericAxis().withGrowBy(0.1, 0.1).build();
	console.log("T1", this.nativeView.getXAxes(), xAxis );

	java.util.Collections.addAll(this.nativeView.getXAxes(), [xAxis]);
	java.util.Collections.addAll(this.nativeView.getYAxes(), [yAxis]);

	// Setup Modifiables
	java.util.Collections.addAll(this.nativeView.getChartModifiers(), [this.builder.newModifierGroupWithDefaultModifiers().build()]);
	this._setupRendering();

};

Object.defineProperty(SciChart.prototype, "android", {get: function() { return this._android; }});
Object.defineProperty(SciChart.prototype, "_nativeView", {get: function() { return this._android; }});
Object.defineProperty(SciChart.prototype, "data", {get: function() { return this._data;}, set: function(data) { this._setData(data); }});

SciChart.prototype._setData = function(data) {
	if (!this.builder) { return; }
	let newData = this.builder.newXyDataSeries(java.lang.Double.class, java.lang.Double.class).build();

	let x= new com.scichart.core.model.DoubleValues(data.length),y=new com.scichart.core.model.DoubleValues(data.length);
	for (let i=0;i<data.length;i++) {
		//console.log("D:", data[i].x, data[i].y, double(data[i].x));
		x.add(double(data[i].x));
		y.add(double(data[i].y));
	}
	newData.append(x,y);
	this._newData = true;
	this._parsedData = newData;
	console.log("SetData");
	this._setupRendering();
};

SciChart.prototype._setupRendering = function() {
	if (!this._newData) { return; }
	if (!this.nativeView) { return; }

	console.log("Setting Data");
	this._newData = false;
	let rSeries = this.builder.newLineSeries().withDataSeries(this._parsedData).withStrokeStyle(0xFF279B27).build();
	java.util.Collections.addAll(this.nativeView.getRenderableSeries(), [rSeries]);
};


exports.SciChart = SciChart;

console.log("2");