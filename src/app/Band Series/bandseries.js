var scichart = require("scichart-ui");
var surface;
var sciChartSurfaceView;
// var frameworkBundle = NSBundle.bundleForClass(scichart.class);
// frameworkBundle.loadNibNamedOwnerOptions("SCIAxisDataView.nib", scichart, null);
function onPageLoaded(args) {
     initializeSurfaceData();
}
exports.onPageLoaded = onPageLoaded;
//var constraints;
// function addConstraints(constraints) {

// }

function creatingChart(args) {
   var View = SCIChartSurfaceView.alloc().initWithFrame(CGRectMake( 0, 0, 414, 736 ));
   sciChartSurfaceView = View;
   sciChartSurfaceView.setTranslatesAutoresizingMaskIntoConstraints = false;

   args.view = sciChartSurfaceView;
    var layout = {
        "SciChart": sciChartSurfaceView
    }; 
   // var constraints = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("|-(0)-[SciChart]-(0)-|", 0, 0, layout);
   // constraints+= NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout);
            // self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("|-(0)-[SciChart]-(0)-|", 0, 0, layout));
            // self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout));
   // args.view = constraints;

    //initializeSurfaceData();

           
}

defineClass('BandChartView', {
    createBandRenderableSeries: function() {
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.05), SCIGeneric(0.05)));
        var xyyDataSeries = SCIXyyDataSeries.alloc().initWithXType_YType(SCIDataType_Double, SCIDataType_Double);

        xyyDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());

        xyyDataSeries.setSeriesName("Bubble Series");

        for (var i = 0; i < 500; i++) {
            var time = 10 * i / (double) 500;
            var wn = 2 * M_PI / (500 / (double) 3);

            xyyDataSeries.appendX_Y1_Y2(SCIGeneric(time), SCIGeneric(0.03 * sin(i * wn + 4)), SCIGeneric(0.05 * sin(i * wn + 12)));
        }

        var bandRenderableSeries = SCIBandRenderableSeries.alloc().init();

        bandRenderableSeries.style().setBrush1(SCIBrushSolid.alloc().initWithColorCode(0x50279b27));
        bandRenderableSeries.style().setBrush2(SCIBrushSolid.alloc().initWithColorCode(0x501919ff));
        bandRenderableSeries.style().setPen2(SCIPenSolid.alloc().initWithColorCode_Width(0xFF1919ff, 0.5));
        bandRenderableSeries.style().setPen1(SCIPenSolid.alloc().initWithColorCode_Width(0xFF279b27, 0.5));

        bandRenderableSeries.style().setDrawPointMarkers(NO);
        bandRenderableSeries.setXAxisId("xAxis");
        bandRenderableSeries.setYAxisId("yAxis");

        bandRenderableSeries.setDataSeries(xyyDataSeries);

        surface.attachRenderableSeries(bandRenderableSeries);
    }
    
    function initializeSurfaceData() {
        surface = SCIChartSurface.alloc().initWithView(sciChartSurfaceView);

        surface.style().setBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));
        surface.style().setSeriesBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));

        var majorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF393532, 0.6);
        var gridBandPen = SCIBrushSolid.alloc().initWithColorCode(0xE1232120);
        var minorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF262423, 0.5);

        var textFormatting = SCITextFormattingStyle.alloc().init();
        textFormatting.setFontSize(16);
        textFormatting.setFontName("Arial");
        textFormatting.setColorCode(0xFFafb3b6);

        var axisStyle = SCIAxisStyle.alloc().init();
        axisStyle.setMajorTickBrush(majorPen);
        axisStyle.setGridBandBrush(gridBandPen);
        axisStyle.setMajorGridLineBrush(majorPen);
        axisStyle.setMinorTickBrush(minorPen);
        axisStyle.setMinorGridLineBrush(minorPen);
        axisStyle.setLabelStyle(textFormatting);
        axisStyle.setDrawMinorGridLines(YES);
        axisStyle.setDrawMajorBands(YES);

        var axis = SCINumericAxis.alloc().init();
        axis.setStyle(axisStyle);
        axis.setAxisId("yAxis");
        surface.attachAxis_IsXAxis(axis, NO);

        axis = SCINumericAxis.alloc().init();
        axis.setAxisId("xAxis");
        axis.setStyle(axisStyle);
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.05), SCIGeneric(0.05)));
        surface.attachAxis_IsXAxis(axis, YES);

        var xDragModifier = SCIXAxisDragModifier.new();
        xDragModifier.setAxisId("xAxis");
        xDragModifier.setDragMode(SCIAxisDragMode_Scale);
        xDragModifier.setClipModeX(SCIZoomPanClipMode_None);

        var yDragModifier = SCIYAxisDragModifier.new();
        yDragModifier.setAxisId("yAxis");
        yDragModifier.setDragMode(SCIAxisDragMode_Pan);


        var pzm = SCIPinchZoomModifier.alloc().init();
        var zem = SCIZoomExtentsModifier.alloc().init();
        var rollover = SCIRolloverModifier.alloc().init();

        rollover.setModifierName("Rollover Modifier");
        zem.setModifierName("ZoomExtents Modifier");
        pzm.setModifierName("PinchZoom Modifier");
        yDragModifier.setModifierName("YAxis Drag Modifier");
        xDragModifier.setModifierName("XAxis Drag Modifier");

        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, rollover]);
        surface.setChartModifier(gm);
        self.createBandRenderableSeries();


        surface.invalidateElement();
    },
});