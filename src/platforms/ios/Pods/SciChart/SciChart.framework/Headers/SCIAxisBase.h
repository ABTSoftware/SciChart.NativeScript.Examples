//
//  AxisBase.h
//  SciChart
//
//  Created by Admin on 10.07.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup Axis
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIAxisCore.h"
#import "SCIAxis2D.h"
#import "SCIThemebleProtocol.h"

@class SCIAxisParams;
@protocol SCIRenderSurfaceProtocol;
@class SCIArrayController;

/**
 * @brief Provides base functionality for Axes throughout SciChart
 */
@interface SCIAxisBase : SCIAxisCore <SCIAxis2DProtocol, SCIThemebleProtocol> {
    @protected
    id<SCICoordinateCalculatorProtocol> _currentCoordinateCalculator;
    id<SCIAxisInteractivityHelperProtocol> _currentInteractivityHelper;
    SCIArrayController * _supportedTypes;
}

/**
 * Gets or sets the Axis Id
 * @discussion E.g. can be used when there is a need to find the axis in axes collection
 */
@property (nonatomic, copy) NSString * axisId;

/**
 * Gets or sets the AxisAlignment for this Axis. Default is Right.
 * @see SCIAxisAlignment
 */
@property (nonatomic) SCIAxisAlignment axisAlignment;

/**
 * Called when axis alignment is changed
 */
@property (nonatomic, copy) SCIActionBlock onAxisAlignmentChanged;

/**
 * Gets or sets whether current Axis should be placed in the center of chart or not
 */
@property (nonatomic) BOOL isCenterAxis;

/** Gets or sets whether current Axis is the main one in axis collection. This is the axis which is responsible for drawing grid lines on the chart view
 @discussion By default this is the first axis in the collection
 */
@property (nonatomic) BOOL isPrimaryAxis;

/** Gets or sets the visibility of the Axis*/
@property (nonatomic) BOOL isVisible;

/** Gets or sets the VisibleRangeLimitMode of the Axis
 * @discussion This property defines which parts of VisibleRangeLimit will be used by axis
 */
@property (nonatomic) SCIRangeClipMode visibleRangeLimitMode;

/** Gets or sets a value indicating whether label culling is enabled (when labels overlap) on this AxisPanel instance*/
@property (nonatomic) BOOL isLabelCullingEnabled;

/** Gets or sets the VisibleRangeLimit of the Axis. This will be used to clip the axis during ZoomExtents and AutoRange operations
 * @code
 self.chartSurface.xAxes.getAxisById("xAxis").visibleRangeLimit = SCIDoubleRange(min: SCIGeneric(2), max: SCIGeneric(400))
 * @endcode
 @see SCIRangeProtocol
 */
@property (nonatomic, strong) id<SCIRangeProtocol> visibleRangeLimit;

+(NSString *) defaultAxisId;

/**
 * Defines the minimum distance to the edge of the chart to cull axis labels
 */
-(int) minDistanceToBounds;

/**
 @brief Method is used for adding some grow by to default zero range.
 @discussion By default growth of zero range is 0.01 in min and max direction. This is needed because actual zero range is impossible to draw, and once set it would be impossible to interact with such axis with modifiers.
 */
-(double) zeroRangeGrowBy;

/**
 *  Get the RenderSurface instance off the parent SCIChartSurface
 */
-(id<SCIRenderSurfaceProtocol>) renderSurface;

/**
 @brief Method enlarges default zero range a little with zeroRangeGrowBy.
 @discussion Method is called when internal calculations returns zero range, for example for maximum range.
 */
-(id<SCIRangeProtocol>) coerceZeroRange:(id<SCIRangeProtocol>)maximumRange;

/**
 @brief Returns a list of types which current axis is designed to work with
 @return SCIArrayController which contains list of supported SCIDataType
 @see SCIArrayController
 @see SCIDataType
 */
-(SCIArrayController*) getSupportedTypes;

/**
 * Gets an SCIAxisParams instance with info about the current axis setup
 * @see SCIAxisParams
 */
-(SCIAxisParams*) getAxisParams;

/**
 * Called internal to draw the axis
 */
-(void) onDrawWithContext:(id<SCIRenderContext2DProtocol>)renderContext WithData:(id<SCIRenderPassDataProtocol>)renderPassData;

@property (nonatomic) BOOL isLicenseValid;

/**
 * Called internal to draw gridlines before Axis drawing
 */
-(void) drawGridLinesWithContext:(id<SCIRenderContext2DProtocol>)renderContext WithCoordinates:(SCITickCoordinates*)tickCoords;

/**
 * Called internal to draw axis ticks before Axis drawing
 */
-(void) onDrawAxis:(SCITickCoordinates*)tickCoords;

/**
 * Gets the axis panel, area where the axis is drawn
 * @see SCIAxisPanelProtocol
 */
-(id<SCIAxisPanelProtocol>) axisPanel;

/**
 * Returns an offset for the axis
 */
-(double) getOffsetForLabels;

/**
 * Gets the data-value from tick
 * @param value Tick
 * @return SCIGenericType
 * @see SCIGenericType
 */
-(SCIGenericType) convertTickToDataValue:(SCIGenericType)value;

/**
 * Gets or sets the style of the current axis
 * @code
 let axisStyle = SCIAxisStyle()
 
 let majorPen = SCIPenSolid(colorCode: SCSColorsHEX.majorPen, width: 0.5)
 let minorPen = SCIPenSolid(colorCode: SCSColorsHEX.minorPen, width: 0.5)
 
 let textFormat = SCITextFormattingStyle()
 textFormat.fontName = SCSFontsName.defaultFontName
 textFormat.fontSize = SCSFontSizes.defaultFontSize
 
 axisStyle.majorTickBrush = majorPen
 axisStyle.majorGridLineBrush = majorPen
 axisStyle.gridBandBrush = SCIBrushSolid.init(colorCode: SCSColorsHEX.gridBandPen)
 axisStyle.minorTickBrush = minorPen
 axisStyle.minorGridLineBrush = minorPen
 axisStyle.labelStyle = textFormat
 axisStyle.drawMinorGridLines = true
 axisStyle.drawMajorBands = true
 
 axis.style = axisStyle
 * @endcode
 */
@property (nonatomic, copy) SCIAxisStyle * style;

/**
 * Called internal to draw axis area before Axis drawing
 */
-(void) drawAxisAreaWithContext:(id<SCIRenderContext2DProtocol>)renderContext;

/**
 * Called internal to prepare gridlines before Axis drawing
 */
-(BOOL) prepareToDrawGridLines:(id<SCIRenderContext2DProtocol>)renderContext;

/**
 * Called internal to draw bands before Axis drawing
 */
-(void) drawBandsWithContext:(id<SCIRenderContext2DProtocol>)renderContext;

/**
 * Called internal to draw minor gridlines before Axis drawing
 */
-(void) drawMinorGridLinesWithContext:(id<SCIRenderContext2DProtocol>)renderContext;

/**
 * Called internal to draw major gridlines before Axis drawing
 */
-(void) drawMajorGridLinesWithContext:(id<SCIRenderContext2DProtocol>)renderContext;

@end

/** @}*/
