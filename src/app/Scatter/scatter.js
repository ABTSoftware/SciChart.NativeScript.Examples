require('SCIXyDataSeries,SCIXyScatterRenderableSeries,SCIUserDefinedDistributionCalculator,SCIEllipsePointMarker,SCIBrushSolid,SCIPenSolid,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCITextFormattingStyle,SCIAxisStyle,SCINumericAxis,SCIDoubleRange,SCIDateTimeAxis,SCIXAxisDragModifier,SCIYAxisDragModifier,SCIPinchZoomModifier,SCIZoomExtentsModifier,SCICursorModifier,SCIModifierGroup');
defineClass('ScatterSeriesChartView', {
    getScatterRenderableSeriesWithDetalization_Color_Negative: function(pointMarkerDetalization, color, negative) {
        var scatterDataSeries = SCIXyDataSeries.alloc().initWithXType_YType(SCIDataType_DateTime, SCIDataType_Float);

        //Getting Fourier dataSeries
        for (var i = 0; i < 200; i++) {
            var x = i;
            var time = (i < 100) ? arc4random_uniform(x + 10) : arc4random_uniform(200 - x + 10);
            var y = time * time * time;
            if (negative) {
                scatterDataSeries.appendX_Y(SCIGeneric(x), SCIGeneric(-y));
            } else {
                scatterDataSeries.appendX_Y(SCIGeneric(x), SCIGeneric(y));
            }
        }

        var xyScatterRenderableSeries = SCIXyScatterRenderableSeries.alloc().init();
        scatterDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());
        scatterDataSeries.setSeriesName((pointMarkerDetalization == 6) ? ((negative) ? "Negative Hex" : "Positive Hex") : ((negative) ? "Negative" : "Positive"));

        var ellipsePointMarker = SCIEllipsePointMarker.alloc().init();
        ellipsePointMarker.setDrawBorder(YES);
        ellipsePointMarker.setFillBrush(SCIBrushSolid.alloc().initWithColorCode(color));
        ellipsePointMarker.setBorderPen(SCIPenSolid.alloc().initWithColorCode_Width(0xFFFFFFFF, 0.1));
        ellipsePointMarker.setDetalization(pointMarkerDetalization);
        ellipsePointMarker.setHeight(6);
        ellipsePointMarker.setWidth(6);

        xyScatterRenderableSeries.style().setPointMarker(ellipsePointMarker);
        xyScatterRenderableSeries.setXAxisId("xAxis");
        xyScatterRenderableSeries.setYAxisId("yAxis");
        xyScatterRenderableSeries.setDataSeries(scatterDataSeries);

        return xyScatterRenderableSeries;
    },
    initWithFrame: function(frame) {
        self = self.super().initWithFrame(frame);

        if (self) {
            var view = SCIChartSurfaceView.alloc().init();
            sciChartSurfaceView = view;

            sciChartSurfaceView.setTranslatesAutoresizingMaskIntoConstraints(NO);

            self.addSubview(sciChartSurfaceView);
            var layout = {
                "SciChart": sciChartSurfaceView
            };

            self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("|-(0)-[SciChart]-(0)-|", 0, 0, layout));
            self.addConstraints(NSLayoutConstr aint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout));

            self.initializeSurfaceData(); 
        }

        return self;
    },
    initializeSurfaceData: function() {
        surface.free();
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

        axis = SCIDateTimeAxis.alloc().init();
        axis.setAxisId("xAxis");
        axis.setStyle(axisStyle);
        surface.attachAxis_IsXAxis(axis, YES);
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));

        var xDragModifier = SCIXAxisDragModifier.new();
        xDragModifier.setAxisId("xAxis");
        xDragModifier.setDragMode(SCIAxisDragMode_Scale);
        xDragModifier.setClipModeX(SCIZoomPanClipMode_None);

        var yDragModifier = SCIYAxisDragModifier.new();
        yDragModifier.setAxisId("yAxis");
        yDragModifier.setDragMode(SCIAxisDragMode_Pan);


        var pzm = SCIPinchZoomModifier.alloc().init();
        var zem = SCIZoomExtentsModifier.alloc().init();

        var cursor = SCICursorModifier.alloc().init();
        cursor.style().setHitTestMode(SCIHitTest_Point);
        cursor.style().setColorMode(SCITooltipColorMode_SeriesColorToDataView);
        cursor.style().setTooltipSize(CGSizeMake(200, NAN));

        zem.setModifierName("ZoomExtents Modifier");
        pzm.setModifierName("PinchZoom Modifier");
        cursor.setModifierName("Cursor Modifier");
        yDragModifier.setModifierName("Y Axis Drag Modifier");
        xDragModifier.setModifierName("X Axis Drag Modifier");


        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, cursor]);
        surface.setChartModifier(gm);

        var chart1 = self.getScatterRenderableSeriesWithDetalization_Color_Negative(3, 0xFF01ebff, NO);
        var chart2 = self.getScatterRenderableSeriesWithDetalization_Color_Negative(6, 0xFF00a3ff, NO);
        var chart3 = self.getScatterRenderableSeriesWithDetalization_Color_Negative(3, 0xFF0165ff, YES);
        var chart4 = self.getScatterRenderableSeriesWithDetalization_Color_Negative(6, 0xFF00a3ff, YES);

        surface.attachRenderableSeries(chart1);
        surface.attachRenderableSeries(chart2);
        surface.attachRenderableSeries(chart3);
        surface.attachRenderableSeries(chart4);

        surface.invalidateElement();
    },
});