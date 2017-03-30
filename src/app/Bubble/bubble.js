require('SCIXyzDataSeries,SCIUserDefinedDistributionCalculator,SCIBubbleRenderableSeries,SCIBrushSolid,SCIPenSolid,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCITextFormattingStyle,SCIAxisStyle,SCINumericAxis,SCIDoubleRange,SCIXAxisDragModifier,SCIYAxisDragModifier,SCIPinchZoomModifier,SCIZoomExtentsModifier,SCITooltipModifier,SCIModifierGroup');
defineClass('BubbleChartView', {
    createBubbleRenderableSeries: function() {
        var xyzDataSeries = SCIXyzDataSeries.alloc().initWithXType_YType_ZType(SCIDataType_Float, SCIDataType_Float, SCIDataType_Float);

        xyzDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());

        xyzDataSeries.setSeriesName("Bubble Series");

        for (var i = 0; i < 20; i++) {
            xyzDataSeries.appendX_Y_Z(SCIGeneric((float) i), SCIGeneric(sin((float) i)), SCIGeneric((float)(arc4random() % 30)));
        }

        var bubbleRenderableSeries = SCIBubbleRenderableSeries.alloc().init();

        bubbleRenderableSeries.style().setBubbleBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF3f3bd6));
        bubbleRenderableSeries.style().setBorderPen(SCIPenSolid.alloc().initWithColorCode_Width(0xFF99EE99, 0.7));
        bubbleRenderableSeries.style().setDetalization(44);
        bubbleRenderableSeries.setXAxisId("xAxis");
        bubbleRenderableSeries.setYAxisId("yAxis");

        bubbleRenderableSeries.setZScale(3);

        bubbleRenderableSeries.setDataSeries(xyzDataSeries);

        surface.attachRenderableSeries(bubbleRenderableSeries);
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
            self.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:|-(0)-[SciChart]-(0)-|", 0, 0, layout));
            self.initializeSurfaceData();
        }

        return self;  
    },
    initializeSurfaceData: function() {
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
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.05), SCIGeneric(0.05)));
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

        var tooltip = SCITooltipModifier.alloc().init();
        //    tooltip.style().tooltipSize() = CGSizeMake(100, NAN);

        tooltip.setModifierName("ToolTip Modifier");
        zem.setModifierName("ZoomExtents Modifier");
        pzm.setModifierName("PinchZoom Modifier");
        yDragModifier.setModifierName("YAxis Drag Modifier");
        xDragModifier.setModifierName("XAxis Drag Modifier");

        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, tooltip]);
        surface.setChartModifier(gm);

        self.createBubbleRenderableSeries();

        surface.invalidateElement();
    },
});