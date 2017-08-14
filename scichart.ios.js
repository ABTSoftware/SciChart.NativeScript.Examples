/**********************************************************************************
* (c) 2017, Nathanael Anderson.
* Licensed under the MIT license.
*
* Version 1.0.0                                        nathan@master-technology.com
**********************************************************************************/
'use strict';

/* global SCIChartSurfaceView, SCIChartSurface */
console.log("1");

const ContentView = require('ui/content-view').ContentView;


function SciChart() {
	ContentView.apply(this, arguments);
	this.nativeView = this._ios = new UIView(CGRectMake(0, 0, 400, 400));
	this.surface = SCIChartSurface.alloc().initWithFrame(CGRectMake(0, 0, 800, 800));
	this.surface.translatesAutoresizingMaskIntoConstraints = true;
	this.nativeView.addSubview(this.surface);
	console.log("set debugWhySciChartDoesntRender = true");
    this.surface.debugWhySciChartDoesntRender = true;

	this.surface.xAxes.add(SCINumericAxis.alloc().init());
	this.surface.yAxes.add(SCINumericAxis.alloc().init());

	let newData = SCIXyDataSeries.alloc().initWithXTypeYType(SCIDataType_Float, SCIDataType_Float);
	for (let i=0;i<100 ;i++) {
		newData.appendXY(SCIGeneric(i), SCIGeneric(i * Math.random()));
	}

	let renderableSeries = SCIFastMountainRenderableSeries.alloc().init();
	renderableSeries.dataSeries = newData;
	this.surface.renderableSeries.add(renderableSeries);
	// this._chartType = "SCIFastLineRenderableSeries";
	// this._data = null;
	// This is used so that we don't have to re-parse all the data on a chart change
	// Technically it isn't needed other than for speed.
	// this._parsedData = null;
}
__extends(SciChart, ContentView);

Object.defineProperty(SciChart.prototype, "ios", {get: function() { return this._ios; }});
Object.defineProperty(SciChart.prototype, "_nativeView", {get: function() { return this._ios; }});
Object.defineProperty(SciChart.prototype, "xAxis", {get: function() { return this._xAxis; }, set: function(type) {
	if (this._xAxis) {
		this.removeAxis(this._xAxis);
	}
	this._xAxis = this.addAxis("xAxis", type, {x: true});
	// if (this._renderSeries) {
	// 	this._renderSeries.xAxisId = "xAxis";
	// }
}});
Object.defineProperty(SciChart.prototype, "yAxis", {get: function() { return this._yAxis; }, set: function(type) {
	if (this._yAxis) {
		this.removeAxis(this._xAxis);
	}
	this._yAxis = this.addAxis("yAxis", type, {x: false});
	// if (this._renderSeries) {
	// 	this._renderSeries.yAxisId = "yAxis";
	// }

}});
Object.defineProperty(SciChart.prototype, "title", {get: function() { return this._title; }, set: function(title) {
	this._title = title;
	this.surface.chartTitle = title;
}});
Object.defineProperty(SciChart.prototype, "chart", {get: function() { return this._chartType;}, set: function(chart) {
	this._chartType = chart;
	if (this._renderSeries) {
		this.surface.detachRenderableSeries(this._renderSeries);
		this._renderSeries = null;
	}
	this._setupRendering();
}});

Object.defineProperty(SciChart.prototype, "data", {get: function() { return this._data;}, set: function(data) { this._setData(data); }});

SciChart.prototype._setData = function(data) {
	let newData = SCIXyDataSeries.alloc().initWithXTypeYType(SCIDataType_Float, SCIDataType_Float);
	for (let i=0;i<data.length;i++) {
		newData.appendXY(SCIGeneric(data[i].x), SCIGeneric(data[i].y));
		const n = SCIGeneric(data[i].x);
		const x = SCIGenericFloat(n);
	}
	this._parsedData = newData;
	this._setupRendering();
};

SciChart.prototype._setupRendering = function() {
	if (!this._renderSeries) {
		switch (this._chartType) {
			case 'SCIFastMountainRenderableSeries':
				this._renderSeries = SCIFastMountainRenderableSeries.alloc().init();
				break;

			case 'SCIFastColumnRenderableSeries':
				this._renderSeries = SCIFastColumnRenderableSeries.alloc().init();
				this._renderSeries.dataDistributionCalculator = new SCIUserDefinedDistributionCalculator();
				this._renderSeries.style.dataPointWidth = 0.3;
				break;

			case 'SCIFastLineRenderableSeries': // jshint ignore:line
			default:
				this._renderSeries = SCIFastLineRenderableSeries.alloc().init();

		}
		this._renderSeries.strokeStyle = SCISolidPenStyle.alloc().initWithColorCodeWithThickness(0xFF00FF00,2.0);

		// if (this._xAxis) {
		// 	console.log("Setting xAxis");
		// 	this._renderSeries.xAxisId = this._xAxis.axisId;
		// }
		// if (this._yAxis) {
		// 	console.log("Setting yAxis");
		// 	this._renderSeries.yAxisId = this._yAxis.axisId;
		// }
		//console.dump(this.surface.prototype);
		this.surface.renderableSeries = this._renderSeries;
	}

	if (this._parsedData) {
		this._renderSeries.dataSeries = this._parsedData;
	}
	if (this.surface) {

		setTimeout(() => {
			console.log("invalidate Element");
			this.surface.invalidateElement();
		} , 500);
		//
	}

};

// SciChart.prototype.removeAxis = function(axis) {
//     // this.surface.detachAxis(axis);
// };


// SciChart.prototype.addAxis = function(id, type, parameters) {
// 	let axis = null;
//   switch (type) {
// 	  case this.AXIS.SCICategoryDateTimeAxis:
// 	  		axis = SCICategoryDateTimeAxis.alloc().init();
// 	  		break;
// 	  case this.AXIS.SCIDateTimeAxis:
// 	  		axis = SCIDateTimeAxis.alloc().init();
// 	  		break;
// 	  case this.AXIS.SCILogarithmicAxis:
// 	  		axis = SCILogarithmicAxis.alloc().init();
// 		  break;
// 	  case this.AXIS.SCINumericAxis: // jshint ignore:line
// 	  default:
// 	  		axis = SCINumericAxis.alloc().init();
// 	  		break;
//   }
//   axis.axisId = id;
//   if (parameters.x) {
// 	  axis.axisAlignment = SCIAxisAlignment_Left;
// 	  axis.axisTitle = "X-Axis";
//   } else {
// 	  axis.axisAlignment = SCIAxisAlignment_Top;
// 	  axis.axisTitle = "Y-Axis";
//   }
//   let textFormatting = SCITextFormattingStyle.alloc().init();
//   textFormatting.fontSize = 12;

//   axis.labelStyle = textFormatting;

//   if (parameters.x) {
//   	this.surface.xAxis = axis;
//   } else {
//   	this.surface.yAxis = axis;
//   }
//   return axis;
// };



// SciChart.AXIS = SciChart.prototype.AXIS = {
// 	SCILogarithmicAxis: "SCILogarithmicAxis",
// 	SCINumericAxis: "SCINumericAxis",
// 	SCIDateTimeAxis: "SCIDateTimeAxis",
// 	SCICategoryDateTimeAxis: "SCICategoryDateTimeAxis"
// };

// SciChart.CHART = SciChart.prototype.CHART = {
// 	SCIFastLineRenderableSeries: "SCIFastLineRenderableSeries",
// 	SCIFastMountainRenderableSeries: "SCIFastMountainRenderableSeries",
// 	SCIFastColumnRenderableSeries: "SCIFastColumnRenderableSeries"
// };


function pointerTo(type, value) {
	var outerPtr = interop.alloc(interop.sizeof(interop.Pointer));
	var outerRef = new interop.Reference(type, outerPtr);
	outerRef.value = value;
	return outerPtr;
}

function SCIGeneric(value) {
	// TODO: Maybe do some type detection, right now we are hard coding this to "Float" for a proof of concept.
	return SCI_constructGenericType(pointerTo(interop.types.float, value), "f");
}


exports.SciChart = SciChart;

console.log("2");