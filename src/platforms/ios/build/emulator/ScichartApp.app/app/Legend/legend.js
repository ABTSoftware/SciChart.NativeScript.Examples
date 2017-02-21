require('SCILegendCollectionModifier,UIColor,SCIXyDataSeries,SCIUserDefinedDistributionCalculator,SCIFastLineRenderableSeries,SCIPenSolid,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCIBrushSolid,SCITextFormattingStyle,SCIAxisStyle,SCINumericAxis');
defineClass('LegendChartView', {
    addModifiers: function() {
        var legend = SCILegendCollectionModifier.alloc().initWithPosition_andOrientation(SCILegendPositionLeft | SCILegendPositionTop, SCILegendOrientationVertical);
        surface.setChartModifier(legend);
    },
    initializeSurfaceRenderableSeries: function() {
        self.attachRenderebleSeriesWithYValue_andColor_seriesName_isVisible(1000, UIColor.yellowColor(), "Curve A", YES);
        self.attachRenderebleSeriesWithYValue_andColor_seriesName_isVisible(2000, UIColor.greenColor(), "Curve B", YES);
        self.attachRenderebleSeriesWithYValue_andColor_seriesName_isVisible(3000, UIColor.redColor(), "Curve C", YES);
        self.attachRenderebleSeriesWithYValue_andColor_seriesName_isVisible(4000, UIColor.blueColor(), "Curve D", NO);
    },
    attachRenderebleSeriesWithYValue_andColor_seriesName_isVisible: function(yValue, color, seriesName, isVisible) {
        var dataCount = 10;

        var dataSeries1 = SCIXyDataSeries.alloc().initWithXType_YType(SCIDataType_Float, SCIDataType_Float);

        var y = yValue;

        for (var i = 1; i <= dataCount; i++) {
            var x = i;
            y = yValue + y;
            dataSeries1.appendX_Y(SCIGeneric(x), SCIGeneric(y));
        }

        dataSeries1.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());
        dataSeries1.setSeriesName(seriesName);

        var renderableSeries1 = SCIFastLineRenderableSeries.new();
        renderableSeries1.style().setLinePen(SCIPenSolid.alloc().initWithColor_Width(color, 0.7));
        renderableSeries1.setXAxisId("xAxis");
        renderableSeries1.setYAxisId("yAxis");
        renderableSeries1.setDataSeries(dataSeries1);
        renderableSeries1.setIsVisible(isVisible);

        surface.attachRenderableSeries(renderableSeries1);
        surface.invalidateElement();
    },
    initWithFrame: function(frame) {
        self = self.super().initWithFrame(frame);

        if (self) {
            var view = SCIChartSurfaceView.alloc().initWithFrame(frame);
            sciChartSurfaceView = view;

            sciChartSurfaceView.setTranslatesAutoresizingMaskIntoConstraints(NO);

            self.addSubview(sciChartSurfaceView);
            var layout = {
                "SciChart": sciChartSurfaceView
            };

            self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("|-(0)-[SciChart]-(0)-|", 0, 0, layout));
            self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout));

            self.initializeSurfaceData();
        }

        return self;
    },
    initializeSurfaceData: function() {
        surface = SCIChartSurface.alloc().initWithView(sciChartSurfaceView);
        surface.style().setBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));
        surface.style().setSeriesBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));
        self.addAxes();
        self.addModifiers();
        self.initializeSurfaceRenderableSeries();
    },
    addAxes: function() {
        var majorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF393532, 0.5);
        var gridBandPen = SCIBrushSolid.alloc().initWithColorCode(0xE1232120);
        var minorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF262423, 0.5);

        var textFormatting = SCITextFormattingStyle.alloc().init();
        textFormatting.setFontSize(16);
        textFormatting.setFontName("Helvetica");
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
        surface.attachAxis_IsXAxis(axis, YES);
    },
});