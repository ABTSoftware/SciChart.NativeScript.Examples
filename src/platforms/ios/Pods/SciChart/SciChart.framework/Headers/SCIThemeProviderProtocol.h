//
//  SCIThemeProviderProtocol.h
//  SciChart
//
//  Created by Mykola Hrybeniuk on 12/12/16.
//  Copyright © 2016 SciChart. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol SCIBrush2DProtocol, SCIPen2DProtocol, SCIPointMarkerProtocol;
@class SCITooltipModifierStyle, SCICursorModifierStyle, SCIRolloverModifierStyle, SCITextFormattingStyle, SCILegendCellStyle;

@protocol SCIThemeProviderProtocol <NSObject>

// ChartSurface Theme
@property (nonatomic) UIFont *chartTitleFont;
@property (nonatomic) UIColor *chartTitleColor;
@property (nonatomic) id<SCIBrush2DProtocol> backgroundBrush;
@property (nonatomic) id<SCIPen2DProtocol> borderPen;
@property (nonatomic) id<SCIBrush2DProtocol> seriesBackgroundBrush;

//RenderableSeries Theme
@property (nonatomic) id<SCIPen2DProtocol> errorBarsLinePenStyle;
@property (nonatomic) id<SCIPen2DProtocol> errorBarsHighPenStyle;
@property (nonatomic) id<SCIPen2DProtocol> errorBarsLowPenStyle;
@property (nonatomic) id<SCIBrush2DProtocol> bubbleBrushStyle;
@property (nonatomic) id<SCIPen2DProtocol> bubblePenBorderStyle;
@property (nonatomic) id<SCIPen2DProtocol> impulseLinePenStyle;
@property (nonatomic) id<SCIBrush2DProtocol> mountainAreaBrushStyle;
@property (nonatomic) id<SCIPen2DProtocol> mountainBorderPenStyle;
@property (nonatomic) id<SCIBrush2DProtocol> stackedMountainAreaBrushStyle;
@property (nonatomic) id<SCIPen2DProtocol> stackedMountainBorderPenStyle;
@property (nonatomic) id<SCIPen2DProtocol> stackedColumnBorderPenStyle;
@property (nonatomic) id<SCIBrush2DProtocol> stackedColumnFillBrushStyle;
@property (nonatomic) id<SCIPen2DProtocol> columnBorderPenStyle;
@property (nonatomic) id<SCIBrush2DProtocol> columnFillBrushStyle;
@property (nonatomic) id<SCIPen2DProtocol> bandPen1Style;
@property (nonatomic) id<SCIPen2DProtocol> bandPen2Style;
@property (nonatomic) id<SCIBrush2DProtocol> bandBrush1Style;
@property (nonatomic) id<SCIBrush2DProtocol> bandBrush2Style;
@property (nonatomic) id<SCIPen2DProtocol> linePenStyle;

@property (nonatomic) id<SCIPen2DProtocol> ohlcUpWickPenStyle;
@property (nonatomic) id<SCIPen2DProtocol> ohlcDownWickPenStyle;

@property (nonatomic) id<SCIPen2DProtocol> candleUpWickPen;
@property (nonatomic) id<SCIPen2DProtocol> candleDownWickPen;
@property (nonatomic) id<SCIBrush2DProtocol> candleUpBodyBrush;
@property (nonatomic) id<SCIBrush2DProtocol> candleDownBodyBrush;

//Axis Theme
@property (nonatomic) SCITextFormattingStyle *axisTickLabelStyle;
@property (nonatomic) SCITextFormattingStyle *axisTitleLabelStyle;
@property (nonatomic) id<SCIPen2DProtocol> axisMajorGridLineBrush;
@property (nonatomic) id<SCIPen2DProtocol> axisMinorGridLineBrush;
@property (nonatomic) id<SCIBrush2DProtocol> axisGridBandBrush;
@property (nonatomic) CGFloat axisMinorTickSize;
@property (nonatomic) CGFloat axisMajorTickSize;

//Annotation Theme
@property (nonatomic) id<SCIPen2DProtocol> annotationLinePenStyle;
@property (nonatomic) id<SCIPointMarkerProtocol> annotationLineResizeMarker;
@property (nonatomic) SCITextFormattingStyle *annotationTextStyle;
@property (nonatomic) UIColor *annotationTextBackgroundColor;
@property (nonatomic) id<SCIPointMarkerProtocol> annotationBoxPointMarkerStyle;
@property (nonatomic) id<SCIPen2DProtocol> annotationBoxBorderPenStyle;
@property (nonatomic) id<SCIBrush2DProtocol> annotationBoxFillBrushStyle;
@property (nonatomic) SCITextFormattingStyle *annotationAxisMarkerTextStyle;
@property (nonatomic) id<SCIPen2DProtocol> annotationAxisMarkerLineStyle;
@property (nonatomic) UIColor *annotationAxisMarkerBackgroundColor;
@property (nonatomic) UIColor *annotationAxisMarkerBorderColor;

//Modifier Theme
@property (nonatomic) SCITooltipModifierStyle *modifierTooltipStyle;
@property (nonatomic) SCICursorModifierStyle *modifierCursorStyle;
@property (nonatomic) SCIRolloverModifierStyle *modifierRolloverStyle;
@property (nonatomic) UIColor *modifierLegendBackgroundColor;
@property (nonatomic) UIColor *modifierLegendBorderColor;
@property (nonatomic) float modifierLegendBorderWidth;
@property (nonatomic) SCILegendCellStyle *modifierLegendCellStyle;

@end
