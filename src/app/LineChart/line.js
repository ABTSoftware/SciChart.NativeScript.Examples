/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 

//var frame;
//var chartView;

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
    //var constraints = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("|-(0)-[SciChart]-(0)-|", 0, 0, layout);
   // constraints+= NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout);
            // self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("|-(0)-[SciChart]-(0)-|", 0, 0, layout));
            // self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout));
   // args.view = constraints;

    //initializeSurfaceData();

           
}
exports.creatingChart = creatingChart;

// function initWithFrame(frame) 
// {
            
// }

// exports.initWithFrame = initWithFrame;
function initializeSurfaceData() {
    surface = SCIChartSurface.alloc().initWithView(sciChartSurfaceView);
    surface.setBackgroundBrush = SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c);
    surface.setSeriesBackgroundBrush = new SCIBrushSolid(0xFF1e1c1c);
    addAxes();
    addModifiers();
    initializeSurfaceRenderableSeries();

}
  
function addAxes()
{
    
        var majorPen = SCIPenSolid.alloc().initWithColorCodeWidth(0xFF393532, 0.5);
        var gridBandPen = SCIBrushSolid.alloc().initWithColorCode(0xE1232120);
        var minorPen = SCIPenSolid.alloc().initWithColorCodeWidth(0xFF262423, 0.5);
        var textFormatting = new SCITextFormattingStyle();
        textFormatting.setFontSize = 16;
        textFormatting.setFontName = "Helvetica";
        textFormatting.setColorCode = 0xFFafb3b6;
        var axisStyle = new SCIAxisStyle();
        axisStyle.setMajorTickBrush = majorPen;
        axisStyle.setGridBandBrush = gridBandPen;
        axisStyle.setMajorGridLineBrush = majorPen;
        axisStyle.setMinorTickBrush = minorPen;
        axisStyle.setMinorGridLineBrush = minorPen;
        axisStyle.setLabelStyle = textFormatting;
        axisStyle.setDrawMinorGridLines = true;
        axisStyle.setDrawMajorBands = true;

        var axis =  SCINumericAxis.alloc().init();
        axis.setStyle = axisStyle;
        axis.setAxisId = "yAxis";
      //  axis.setGrowBy(SCIDoubleRange.alloc().initWithMinMax(0.1, 0.1));
        surface.attachAxis = axis;
        surface.IsXAxis = false;

        axis = new SCINumericAxis();
        axis.setAxisId = "xAxis";
        axis.setStyle = axisStyle;
     //   axis.setGrowBy = new SCIDoubleRange(0.1, 0.1);
        surface.attachAxis = axis;
        surface.IsXAxis = true;
}

function addModifiers() {
    var xDragModifier = new SCIXAxisDragModifier();
    xDragModifier.axisId = "xAxis";
    xDragModifier.dragMode = SCIAxisDragMode_Scale;
    xDragModifier.clipModeX = SCIZoomPanClipMode_None;
    xDragModifier.setModifierName = "XAxis DragModifier";

    var yDragModifier = new SCIYAxisDragModifier();
    yDragModifier.axisId = "yAxis";
    yDragModifier.dragMode = SCIAxisDragMode_Pan;
  //  yDragModifier.clipModeX = SCIZoomPanClipMode_None;
    yDragModifier.setModifierName = "YAxis DragModifier";

    var pzm = SCIPinchZoomModifier.alloc().init();
    pzm.setModifierName = "PinchZoom Modifier";

    var zem = SCIZoomExtentsModifier.alloc().init();
    zem.setModifierName = "ZoomExtents Modifier";

    var rollover = SCIRolloverModifier.alloc().init();
    rollover.style.tooltipSize = CGSizeMake(200, 300);
    rollover.setModifierName = "Rollover Modifier";

    var gm = SCIModifierGroup.alloc().iniWithChildModifiers = [xDragModifier, yDragModifier, pzm, zem, rollover];
  //  surface.chartModifier = gm;

}

function initializeSurfaceRenderableSeries()
{
    var dataCount = 20;
    
    var priceDataSeries = SCIXyDataSeries.alloc().initWithXYType =(SCIDataType_Float, SCIDataType_Float);
    //Getting Fourier dataSeries
    for (var i = 0; i < dataCount; i++) {
        var time = 10 * i /  dataCount;
        var x = time;
        var y = arc4random_uniform(20);
        priceDataSeries.appendX = x;
        priceDataSeries.appendY = y;
    }

    dataCount = 1000;
    var fourierDataSeries = SCIXyDataSeries.alloc().initWithXYType =(SCIDataType_Float, SCIDataType_Float);

    //Getting Fourier dataSeries
    for (var i = 0; i < dataCount; i++) {
        var time = 10 * i /  dataCount;
        var x = time;
        var y = 2 * sin(x) + 10;
        fourierDataSeries.appendX = x
        fourierDataSeries.appendy = y;
    };

     priceDataSeries.dataDistributionCalculator = SCIUserDefinedDistributionCalculator.alloc().init();

     fourierDataSeries.dataDistributionCalculator = SCIUserDefinedDistributionCalculator.alloc().init();

     var ellipsePointMarker = SCIEllipsePointMarker.alloc().init();
     ellipsePointMarker.setDrawBorder = true;
     ellipsePointMarker.setFillBrush = SCIBrushSolid.alloc().initWithColorCode(0xFFd6ffd7);
     ellipsePointMarker.setHeight = 5;
     ellipsePointMarker.setWidth = 5;

     var priceRenderableSeries = SCIFastLineRenderableSeries.alloc().init();
     var style = SCILineSeriesStyle.alloc().init(); 
     priceRenderableSeries.style.setPointMarker = ellipsePointMarker;
     priceRenderableSeries.style.setDrawPointMarkers = true;
     priceRenderableSeries.style.setLinePen = (SCIPenSolid.alloc().initWithColorCodeWidth(0xFF99EE99, 0.7));
     priceRenderableSeries.setXAxisId = "xAxis";
     priceRenderableSeries.setYAxisId = "yAxis";
     priceRenderableSeries.setDataSeries = priceDataSeries;
     surface.attachRenderableSeries = priceRenderableSeries;

    // var fourierRenderableSeries = SCIFastLineRenderableSeries.new();
    // fourierRenderableSeries.style().setLinePen(SCIPenSolid.alloc().initWithColorCode_Width(0xFF4c8aff, 0.7));
    // fourierRenderableSeries.setXAxisId("xAxis");
    // fourierRenderableSeries.setYAxisId("yAxis");
    // fourierRenderableSeries.setDataSeries(fourierDataSeries);
    // surface.attachRenderableSeries(fourierRenderableSeries);

    // surface.invalidateElement();
    
    

}

exports.addModifiers = addModifiers;
exports.addAxes = addAxes;
exports.initializeSurfaceData = initializeSurfaceData;

