require('SCIXyDataSeries,SCIUserDefinedDistributionCalculator,SCIEllipsePointMarker,SCIBrushSolid,SCIFastLineRenderableSeries,SCIPenSolid,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCITextFormattingStyle,SCIAxisStyle,SCINumericAxis,SCIDoubleRange,SCIXAxisDragModifier,SCIYAxisDragModifier,SCIPinchZoomModifier,SCIZoomExtentsModifier,SCIRolloverModifier,SCIModifierGroup');
defineClass('LineChartView', {
    initializeSurfaceRenderableSeries: function() {
        var dataCount = 20;
        var priceDataSeries = SCIXyDataSeries.alloc().initWithXType_YType(SCIDataType_Float, SCIDataType_Float);
        //Getting Fourier dataSeries
        for (var i = 0; i < dataCount; i++) {
            var time = 10 * i / (double) dataCount;
            var x = time;
            var y = arc4random_uniform(20);
            priceDataSeries.appendX_Y(SCIGeneric(x), SCIGeneric(y));
        }

        dataCount = 1000;
        var fourierDataSeries = SCIXyDataSeries.alloc().initWithXType_YType(SCIDataType_Float, SCIDataType_Float);

        //Getting Fourier dataSeries
        for (var i = 0; i < dataCount; i++) {
            var time = 10 * i / (double) dataCount;
            var x = time;
            var y = 2 * sin(x) + 10;
            fourierDataSeries.appendX_Y(SCIGeneric(x), SCIGeneric(y));
        };

        priceDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());
        fourierDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());

        var ellipsePointMarker = SCIEllipsePointMarker.alloc().init();
        ellipsePointMarker.setDrawBorder(YES);
        ellipsePointMarker.setFillBrush(SCIBrushSolid.alloc().initWithColorCode(0xFFd6ffd7));
        ellipsePointMarker.setHeight(5);
        ellipsePointMarker.setWidth(5);

        var priceRenderableSeries = SCIFastLineRenderableSeries.new();
        priceRenderableSeries.style().setPointMarker(ellipsePointMarker);
        priceRenderableSeries.style().setDrawPointMarkers(YES);
        priceRenderableSeries.style().setLinePen(SCIPenSolid.alloc().initWithColorCode_Width(0xFF99EE99, 0.7));
        priceRenderableSeries.setXAxisId("xAxis");
        priceRenderableSeries.setYAxisId("yAxis");
        priceRenderableSeries.setDataSeries(priceDataSeries);
        surface.attachRenderableSeries(priceRenderableSeries);

        var fourierRenderableSeries = SCIFastLineRenderableSeries.new();
        fourierRenderableSeries.style().setLinePen(SCIPenSolid.alloc().initWithColorCode_Width(0xFF4c8aff, 0.7));
        fourierRenderableSeries.setXAxisId("xAxis");
        fourierRenderableSeries.setYAxisId("yAxis");
        fourierRenderableSeries.setDataSeries(fourierDataSeries);
        surface.attachRenderableSeries(fourierRenderableSeries);

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
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));
        surface.attachAxis_IsXAxis(axis, NO);

        axis = SCINumericAxis.alloc().init();
        axis.setAxisId("xAxis");
        axis.setStyle(axisStyle);
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));
        surface.attachAxis_IsXAxis(axis, YES);
    },
    addModifiers: function() {
        var xDragModifier = SCIXAxisDragModifier.new();
        xDragModifier.setAxisId("xAxis");
        xDragModifier.setDragMode(SCIAxisDragMode_Scale);
        xDragModifier.setClipModeX(SCIZoomPanClipMode_None);
        xDragModifier.setModifierName("XAxis DragModifier");

        var yDragModifier = SCIYAxisDragModifier.new();
        yDragModifier.setAxisId("yAxis");
        yDragModifier.setDragMode(SCIAxisDragMode_Pan);
        yDragModifier.setModifierName("YAxis DragModifier");

        var pzm = SCIPinchZoomModifier.alloc().init();
        pzm.setModifierName("PinchZoom Modifier");

        var zem = SCIZoomExtentsModifier.alloc().init();
        zem.setModifierName("ZoomExtents Modifier");

        var rollover = SCIRolloverModifier.alloc().init();
        rollover.style().setTooltipSize(CGSizeMake(200, NAN));
        rollover.setModifierName("Rollover Modifier");

        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, rollover]);
        surface.setChartModifier(gm);
    },
});

