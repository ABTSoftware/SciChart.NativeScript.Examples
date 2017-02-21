require('SCIDoubleRange,SCIHeatMapDataSeries,SCIUserDefinedDistributionCalculator,SCIHeatMapRenderableSeries,SCIChartSurfaceView,NSLayoutConstraint,SCIChartSurface,SCIBrushSolid,SCIPenSolid,SCITextFormattingStyle,SCIAxisStyle,SCINumericAxis,SCIXAxisDragModifier,SCIYAxisDragModifier,SCIPinchZoomModifier,SCIZoomExtentsModifier,SCITooltipModifier,SCIModifierGroup,NSTimer');
   
    function initWithFrame(frame) {
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
            scale = 0.1;
        }

    }
        surface = SCIChartSurface.alloc().initWithView(sciChartSurfaceView);

        surface.style().setSeriesBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));
        var gridBandPen = SCIBrushSolid.alloc().initWithColorCode(0xE1232120);
        var minorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF262423, 0.5);
        surface.invalidateElement();
        var textFormatting = SCITextFormattingStyle.alloc().init();
        textFormatting.setFontName("Arial");

        axisStyle.setGridBandBrush(gridBandPen);
        axisStyle.setMinorTickBrush(minorPen);
        axisStyle.setLabelStyle(textFormatting);
        axisStyle.setDrawMajorBands(YES);
        var axis = SCINumericAxis.alloc().init();
        axis.setStyle(axisStyle);
        surface.attachAxis_IsXAxis(axis, NO);

        axis.setStyle(axisStyle);
        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.05), SCIGeneric(0.05)));
        var xDragModifier = SCIXAxisDragModifier.new();
        xDragModifier.setDragMode(SCIAxisDragMode_Scale);
        var yDragModifier = SCIYAxisDragModifier.new();
        yDragModifier.setAxisId("yAxis");

        var tooltip = SCITooltipModifier.alloc().init();

        tooltip.setModifierName("ToolTip Modifier");
        zem.setModifierName("ZoomExtents Modifier");
        xDragModifier.setModifierName("XAxis Drag Modifier");



    
    // willMoveToWindow: function(newWindow) {
    // } 
    // else {
    //         timer.invalidate();
    //     }
    // },
        return self;
defineClass('HeatmapChartView', {
    initializeSurfaceData: function() {
    getHeatmapRenderableSeries: function() {
        surface.style().setBackgroundBrush(SCIBrushSolid.alloc().initWithColorCode(0xFF1e1c1c));
        increment = 1;

        var range = SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0), SCIGeneric(1));
        var majorPen = SCIPenSolid.alloc().initWithColorCode_Width(0xFF393532, 0.6);
        size = 100;


        textFormatting.setFontSize(16);
        heatmapDataSeries = SCIHeatMapDataSeries.alloc().initWithTypeX_Y_Z_SizeX_Y_RangeX_Y(SCIDataType_Float, SCIDataType_Float, SCIDataType_Float, size, size, range, range);
        textFormatting.setColorCode(0xFFafb3b6);

        var axisStyle = SCIAxisStyle.alloc().init();
        heatmapDataSeries.setDataDistributionCalculator(SCIUserDefinedDistributionCalculator.new());
        axisStyle.setMajorTickBrush(majorPen);
        for (var i = 0; i < size; i++) {
        axisStyle.setMajorGridLineBrush(majorPen);
            for (var j = 0; j < size; j++) {
        axisStyle.setMinorGridLineBrush(minorPen);
                heatmapDataSeries.data().setValue_AtX_Y(SCIGeneric((double) i * j / 10), i, j);
        axisStyle.setDrawMinorGridLines(YES);
            }

        }
        axis.setAxisId("yAxis");

        axis.setGrowBy(SCIDoubleRange.alloc().initWithMin_Max(SCIGeneric(0.05), SCIGeneric(0.05)));
        heatmapDataSeries.setSeriesName("Heatmap Series");
        axis = SCINumericAxis.alloc().init();

        axis.setAxisId("xAxis");
        var heatmapRenderableSeries = SCIHeatMapRenderableSeries.alloc().init();
        surface.attachAxis_IsXAxis(axis, YES);
        heatmapRenderableSeries.style().setMax(SCIGeneric(1));

        heatmapRenderableSeries.setXAxisId("xAxis");
        xDragModifier.setAxisId("xAxis");
        heatmapRenderableSeries.setYAxisId("yAxis");
        xDragModifier.setClipModeX(SCIZoomPanClipMode_None);

        yDragModifier.setDragMode(SCIAxisDragMode_Pan);
        heatmapRenderableSeries.setDataSeries(heatmapDataSeries);

        return heatmapRenderableSeries;
        var zem = SCIZoomExtentsModifier.alloc().init();
    },
        var pzm = SCIPinchZoomModifier.alloc().init();
    updateHeatmapData: function(timer) {
        //    tooltip.style().tooltipSize() = CGSizeMake(100, NAN);
        var seriesPerPeriod = 30;
        pzm.setModifierName("PinchZoom Modifier");
        var angle =  M_PI * scale / seriesPerPeriod;
        yDragModifier.setModifierName("YAxis Drag Modifier");

        surface.setChartModifier(gm);
        for (var x = 0; x < size; x++) {
        var gm = SCIModifierGroup.alloc().initWithChildModifiers([xDragModifier, yDragModifier, pzm, zem, tooltip]);
            for (var y = 0; y < size; y++) {
        surface.attachRenderableSeries(self.getHeatmapRenderableSeries());
                var v = (1 + sin(x * 0.04 + angle)) * 50 + (1 + sin(y * 0.1 + angle)) * 50 * (1 + sin(angle * 2));
        surface.invalidateElement();
                var r = sqrt(x * x + y * y);
        self.super().willMoveToWindow(newWindow);
                var exp = MAX(0, 1 - r * 0.008);
        if (timer == null) {
                var d = (v * exp + arc4random() % 2) / 100;
            timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(0.1, self,  null, YES);
                heatmapDataSeries.data().setValue_AtX_Y(SCIGeneric(d), x, y);
            timer = null;
            }
            self.initializeSurfaceData();
        }

        //scale += 0.5;