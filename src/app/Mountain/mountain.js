require('SCIXyDataSeries,SCIUserDefinedDistributionCalculator,DataManager,SCIFastMountainRenderableSeries,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCIBrushSolid,SCIPenSolid,SCITextFormattingStyle,SCIAxisStyle,SCINumericAxis,SCIDoubleRange,SCIDateTimeAxis,SCIXAxisDragModifier,SCIYAxisDragModifier,SCIPinchZoomModifier,SCIZoomExtentsModifier,SCITooltipModifier,SCIModifierGroup,SCIBrushLinearGradient');
defineClass('MountainChartView', {
    getMountainRenderableSeries_borderPen: function(areaBrush, borderPen) {
        var mountainDataSeries = SCIXyDataSeries.alloc().initWithXType_YType(SCIDataType_DateTime, SCIDataType_Float);
        mountainDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());

        DataManager.loadDataFromFile_fileName_startIndex_increment_reverse(mountainDataSeries, "FinanceData", 0, 1, YES);

        var mountainRenderableSeries = SCIFastMountainRenderableSeries.alloc().init();
        mountainRenderableSeries.style().setAreaBrush(areaBrush);
        mountainRenderableSeries.style().setBorderPen(borderPen);

        mountainRenderableSeries.setXAxisId("xAxis");
        mountainRenderableSeries.setYAxisId("yAxis");
        mountainRenderableSeries.setDataSeries(mountainDataSeries);

        return mountainRenderableSeries;
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
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));
        surface.attachAxis_IsXAxis(axis, NO);

        axis = SCIDateTimeAxis.alloc().init();
        axis.setAxisId("xAxis");
        ((SCIDateTimeAxis * ) axis).setTextFormatting("dd/MM/yyyy");
        axis.setStyle(axisStyle);
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.1), SCIGeneric(0.1)));
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

        tooltip.setModifierName("ToolTip Modifier");
        zem.setModifierName("ZoomExtents Modifier");
        pzm.setModifierName("PinchZoom Modifier");
        yDragModifier.setModifierName("YAxis Drag Modifier");
        xDragModifier.setModifierName("XAxis Drag Modifier");

        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, tooltip]);
        surface.setChartModifier(gm);


        var brush = SCIBrushLinearGradient.alloc().initWithColorCodeStart_Finish_Direction(0xff315897, 0x88090E11, SCILinearGradientDirection_Vertical);
        var pen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF89a7d7, 0.5);
        var series = self.getMountainRenderableSeries_borderPen(brush, pen);
        surface.attachRenderableSeries(series);

        surface.invalidateElement();
    },
});