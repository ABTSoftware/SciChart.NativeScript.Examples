var scichart = require("scichart-ui");
var surface;
var sciChartSurfaceView;
// var frameworkBundle = NSBundle.bundleForClass(scichart.class);
// frameworkBundle.loadNibNamedOwnerOptions("SCIAxisDataView.nib", scichart, null);
function onPageLoaded(args) {
     initializeSurfaceData();
}
exports.onPageLoaded = onPageLoaded;

function creatingChart(args) {
   var View = SCIChartSurfaceView.alloc().initWithFrame(CGRectMake( 0, 0, 414, 736 ));
   sciChartSurfaceView = View;
   sciChartSurfaceView.setTranslatesAutoresizingMaskIntoConstraints = false;

   args.view = sciChartSurfaceView;
    var layout = {
        "SciChart": sciChartSurfaceView
    }; 
          
}

function getPriceRenderableSeries_upBodyBrush_downBodyBrush_count(isRevered, upBodyColor, downBodyColor, count) {

    var ohlcDataSeries = SCIOhlcDataSeries.alloc().initWithXType_YType(SCIDataType_Float, SCIDataType_Float);

    DataManager.loadPriceData_fileName_isReversed_count(ohlcDataSeries, "FinanceData", isRevered, count);

    ohlcDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());

    var candlestickRenderableSeries = SCIFastCandlestickRenderableSeries.alloc().init();

    candlestickRenderableSeries.setXAxisId("xAxis");
    candlestickRenderableSeries.setYAxisId("yAxis");
    candlestickRenderableSeries.setDataSeries(ohlcDataSeries);
    candlestickRenderableSeries.style().setDrawBorders(NO);

    candlestickRenderableSeries.style().setUpWickPen(SCIPenLinearGradient.alloc().initWithColorCodeStart_Finish_Direction_Width(0xFF16aff9, 0xFF16aff9, SCILinearGradientDirection_Vertical, 0.2));

    candlestickRenderableSeries.style().setDownWickPen(SCIPenLinearGradient.alloc().initWithColorCodeStart_Finish_Direction_Width(0xFF16aff9, 0xFF16aff9, SCILinearGradientDirection_Vertical, 0.7));

    candlestickRenderableSeries.style().setUpBodyBrush(upBodyColor);
    candlestickRenderableSeries.style().setDownBodyBrush(downBodyColor);

    return candlestickRenderableSeries;
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
    axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));

    axis = SCINumericAxis.alloc().init();
    axis.setAxisId("xAxis");
    axis.setStyle(axisStyle);
    surface.attachAxis_IsXAxis(axis, YES);
    axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));

    var xAxisDragModifier = SCIXAxisDragModifier.new();
    xAxisDragModifier.setAxisId("xAxis");
    xAxisDragModifier.setDragMode(SCIAxisDragMode_Scale);
    xAxisDragModifier.setClipModeX(SCIZoomPanClipMode_None);

    var yAxisDragModifier = SCIYAxisDragModifier.new();
    yAxisDragModifier.setAxisId("yAxis");
    yAxisDragModifier.setDragMode(SCIAxisDragMode_Pan);

    var pzm = SCIPinchZoomModifier.alloc().init();
    var zem = SCIZoomExtentsModifier.alloc().init();
    var tooltip = SCITooltipModifier.alloc().init();
    //    tooltip.style().tooltipSize() = CGSizeMake(100, NAN);

    tooltip.setModifierName("ToolTip Modifier");
    zem.setModifierName("ZoomExtents Modifier");
    pzm.setModifierName("PinchZoom Modifier");
    yAxisDragModifier.setModifierName("YAxis Drag Modifier");
    xAxisDragModifier.setModifierName("XAxis Drag Modifier");

    var modifierGroup = SCIModifierGroup.alloc().initWithChildModifiers([xAxisDragModifier, yAxisDragModifier, pzm, zem, tooltip]);

    surface.setChartModifier(modifierGroup);


    var chart = getPriceRenderableSeries_upBodyBrush_downBodyBrush_count(FALSE, SCIBrushSolid.alloc().initWithColorCode(0xFF0f9cff), SCIBrushSolid.alloc().initWithColorCode(0xFF66ffff), 30);
    surface.attachRenderableSeries(chart);
    surface.invalidateElement();
}



















































































































       