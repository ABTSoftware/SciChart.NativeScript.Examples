require('SCIXyDataSeries,DataManager,SCIFastColumnRenderableSeries,SCIUserDefinedDistributionCalculator,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCIBrushSolid,SCITextFormattingStyle,SCIPenSolid,SCIAxisStyle,SCINumericAxis,SCIDoubleRange,SCIDateTimeAxis,SCIXAxisDragModifier,SCIYAxisDragModifier,SCIPinchZoomModifier,SCIZoomExtentsModifier,SCIRolloverModifier,SCIModifierGroup,SCIBrushLinearGradient');
defineClass('ColumnChartView', {
    getColumnRenderableSeries_borderPen_order: function(fillBrush, borderPen, order) {
        var columnDataSeries = SCIXyDataSeries.alloc().initWithXType_YType(SCIDataType_DateTime, SCIDataType_Float);

        //Getting Fourier dataSeries
        DataManager.loadDataFromFile_fileName_startIndex_increment_reverse(columnDataSeries, "ColumnData", order, 3, NO);

        var columnRenderableSeries = SCIFastColumnRenderableSeries.alloc().init();

        columnDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());

        columnRenderableSeries.style().setFillBrush(fillBrush);
        columnRenderableSeries.style().setBorderPen(borderPen);
        columnRenderableSeries.style().setDataPointWidth(0.3);

        columnRenderableSeries.setXAxisId("xAxis");
        columnRenderableSeries.setYAxisId("yAxis");

        columnRenderableSeries.setDataSeries(columnDataSeries);

        return columnRenderableSeries;
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
        surface.free();
        surface = SCIChartSurface.alloc().initWithView(sciChartSurfaceView);

        surface.style().setBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));
        surface.style().setSeriesBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));

        var textFormatting = SCITextFormattingStyle.alloc().init();
        textFormatting.setFontSize(20);
        textFormatting.setFontName("Helvetica");
        textFormatting.setColorCode(0xFFFFFFFF);

        var majorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF393532, 0.6);
        var gridBandPen = SCIBrushSolid.alloc().initWithColorCode(0xE1232120);
        var minorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF262423, 0.5);

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
        ((SCIDateTimeAxis * ) axis).setTextFormatting("dd/MM/yyyy");
        axis.setCursorTextFormatting("dd-MM-yyyy");
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
        var rollover = SCIRolloverModifier.alloc().init();

        rollover.setModifierName("Rollover Modifier");
        zem.setModifierName("ZoomExtents Modifier");
        pzm.setModifierName("PinchZoom Modifier");
        yDragModifier.setModifierName("YAxis Drag Modifier");
        xDragModifier.setModifierName("XAxis Drag Modifier");

        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, rollover]);
        surface.setChartModifier(gm);

        var brush1 = SCIBrushLinearGradient.alloc().initWithColorCodeStart_Finish_Direction(0xFF4fd3a9, 0xFF44b993, SCILinearGradientDirection_Vertical);
        var pen1 = SCIPenSolid.alloc().initWithColorCode_Width(0xFF232323, 0.4);
        var chart1 = self.getColumnRenderableSeries_borderPen_order(brush1, pen1, 0);

        var brush2 = SCIBrushLinearGradient.alloc().initWithColorCodeStart_Finish_Direction(0xFF3099fc, 0xFF287fd1, SCILinearGradientDirection_Vertical);
        var pen2 = SCIPenSolid.alloc().initWithColorCode_Width(0xFF232323, 0.4);
        var chart2 = self.getColumnRenderableSeries_borderPen_order(brush2, pen2, 1);

        var brush3 = SCIBrushLinearGradient.alloc().initWithColorCodeStart_Finish_Direction(0xFF3f3bd6, 0xFF3733bc, SCILinearGradientDirection_Vertical);
        var pen3 = SCIPenSolid.alloc().initWithColorCode_Width(0xFF232323, 0.4);
        var chart3 = self.getColumnRenderableSeries_borderPen_order(brush3, pen3, 2);

        surface.attachRenderableSeries(chart1);
        surface.attachRenderableSeries(chart2);
        surface.attachRenderableSeries(chart3);

        surface.invalidateElement();
    },
});