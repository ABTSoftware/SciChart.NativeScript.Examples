//
//  AxisCore.h
//  SciChart
//
//  Created by Admin on 10.07.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup Axis
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIInvalidatableElement.h"
#import "SCIGenericType.h"
#import "SCIRangeChangedCallbackHelper.h"

@protocol SCIRangeProtocol;
@protocol SCICoordinateCalculatorProtocol;
@protocol SCITickProviderProtocol;
@protocol SCIChartSurfaceProtocol;
@class UIView;

/**
 * @typedef SCIAutoRange
 * @abstract Enumeration constants to define the the autorange behaviour for Axis implementers
 * @discussion Possible values:
 * @discussion - SCIAutoRange_Once Allows Axis instance decide whether autorange or not when show Axis first time, e.g. if the current VisibleRange is nil or undefined
 * @discussion - SCIAutoRange_Always Autorange the Axis instance always
 * @discussion - SCIAutoRange_Never Never autoranges the Axis instance
 */
typedef NS_ENUM(int, SCIAutoRange) {
    /** Allows Axis instance decide whether autorange or not when show Axis first time, e.g. if the current VisibleRange is nil or undefined*/
    SCIAutoRange_Once,
    /** Autorange the Axis instance always*/
    SCIAutoRange_Always,
    /** Never autoranges the Axis instance*/
    SCIAutoRange_Never
};

#pragma mark - SCIAxisCore protocol

/**
 @brief Defines protocol for Axis core functionality
 @extends SCIInvalidatableElementProtocol
 */
@protocol SCIAxisCoreProtocol ///
<NSObject, SCIInvalidatableElementProtocol>
/** @{ @} */

/**
 * Gets or sets the VisibleRange of the Axis
 * @see SCIChartSurface
 * @see SCIRangeProtocol
 */
@property (nonatomic, strong) id<SCIRangeProtocol> visibleRange;

/**
 * Gets or sets the GrowBy (0.1, 0.2) will increase the axis extents by 10% (min) and 20% (max) outside of the data range
 * @see SCIRangeProtocol
 */
@property (nonatomic, strong) id<SCIRangeProtocol> growBy; // <double>
/**
 @brief Gets or sets axis minor ticks spacing
 @see SCIGenericType
 */
@property (nonatomic) SCIGenericType minorDelta;

/**
 @brief Gets or sets axis major ticks spacing
 @see SCIGenericType
 */
@property (nonatomic) SCIGenericType majorDelta;

/**
 @brief Method calculates axis' maximal visible range based on all renderable series' data attached to that axis
 @see SCIRangeProtocol
 */
-(id<SCIRangeProtocol>) getMaximumRange;

/**
 * Gets or sets the parent that this Axis belongs to
 * @see SCIChartSurfaceProtocol
 */
@property (nonatomic, weak) id<SCIChartSurfaceProtocol> parentSurface;

/**
 * Gets or sets the axis title
 */
@property (nonatomic, copy) NSString * axisTitle;

/**
 * Gets or sets a flag indicating whether to flip the tick and pixel coordinate generation for this axis, causing the axis ticks to decrement and chart to be flipped in the axis direction
 */
@property (nonatomic) BOOL flipCoordinates;

/**
 * Gets or sets the TextFormatting string for tick labels on this axis
 */
@property (nonatomic, copy) NSString * textFormatting;

/**
 * Gets or sets the minimal zoom constrain of the axis
 * @discussion Used to set the minimum distance between Min and Max of the VisibleRange
 */
@property (nonatomic) SCIGenericType minimalZoomConstrain;
/**
 * Gets or sets the maximum zoom constrain of the axis
 * @discussion Used to set the maximum distance between Min and Max of the VisibleRange
 */
@property (nonatomic) SCIGenericType maximalZoomConstrain;

/**
 * Gets or sets the number of minor delta ticks per major tick
 */
@property (nonatomic) int minorsPerMajor; // minor ticks count between major ticks

/**
 * Gets or sets the max ticks
 */
@property (nonatomic) int maxAutoTicks;

/**
 * Gets or sets value, that indicates whether calculate ticks automatically. Default is true
 */
@property (nonatomic) BOOL autoTicks;

/**
 * Gets or sets a SCITickProvider instance on current axis
 * Used to compute the data-values of axis gridlines, ticks and labels
 */
@property (nonatomic, strong) id<SCITickProviderProtocol> tickProvider;

/**
 * Gets or sets AutoRange mode
 * @see SCIAutoRange
 */
@property (nonatomic) SCIAutoRange autoRange;

/**
 * Gets or sets the text formatting string for labels on this cursor
 */
@property (nonatomic, copy) NSString * cursorTextFormatting;

/**
 * Gets or sets whether the current axis is an logarithmic or not
 */
-(BOOL) isLogarithmicAxis;

/**
 * Gets whether VisibleRange is valid, e.g. is not nil, the difference between Max and Min is positive
 */
-(BOOL) hasValidVisibleRange;

/** Gets whether Axis has default visible range*/
-(BOOL) hasDefaultVisibleRange;

/**
 * Gets or sets whether the current axis is an X-Axis or not
 */
@property (nonatomic) BOOL isXAxis;


/**
 * Animates the visible range of the axis to the destination visible range, over the specified duration
 * @param to The end range
 * @param duration The duration of the animation
 */
-(void) animateVisibleRangeTo:(id<SCIRangeProtocol>)to AnimationTime:(float)duration;

/**
 * Gets or sets the animated VisibleRange of the Axis
 * @discussion When this property is set, the axis animates the Visible Range to the new value over a duration
 */
@property (nonatomic) BOOL animateVisibleRangeChanges;

/**
 * Gets or sets the Duration used when animates the visible range of the axis to the destination visible range
 * @see SCIRange
 */
@property (nonatomic) double animatedChangeDuration;

/**
 * When current visible range is invalid, tries to replace it by old range
 * @return The value, which indicates whether the visiblerange is applied or no
 */
-(BOOL)trySetOrAnimateVisibleRange:(id<SCIRangeProtocol>)newRange;

/**
 * Gets whether the passed range is valid
 * @param range Passed range, that should be validated
 */
-(BOOL) isValidRange:(id<SCIRangeProtocol>)range;

/**
 * Called to check the axis properties are valid for rendering
 */
-(void) validateAxis;

/**
 * Gets the current SCICoordinateCalculator for this axis, based on visible range and axis type
 */
-(id<SCICoordinateCalculatorProtocol>) getCurrentCoordinateCalculator;

/**
 * Gets the size of the axis in the Viewport
 */
-(double) getAxisSize;

/**
 * Gets the coordinate from data-value
 * @param value Data-value to be converted
 * @see SCIGenericType
 */
-(double) getCoordinate:(SCIGenericType)value;

/**
 * Gets the data-value from coordinate
 * @param pixelCoordinate Coordinate
 * @return SCIGenericType
 * @see SCIGenericType
 */
-(SCIGenericType) getDataValue:(double)pixelCoordinate;

/**
 * Returns the offset of the Axis
 */
-(double) getAxisOffset;

/**
 * Method stops all axis internal timers used for animations
 */
-(void) free;

/**
 * Called when visible range is changed
 * @code
 let callback: SCIAxisVisibleRangeChanged = {newRange, oldRange, isAnimated, sender in
 // do important stuff here...
 }
 self.chartSurface.xAxis.registerVisibleRangeChangedCallback(callback)
 * @endcode
 */
-(id<SCICallbackHelperProtocol>) registerVisibleRangeChangedCallback:(SCIAxisVisibleRangeChanged)callback;

/**
 * Sets Title custom view
 */
- (void)setTitleCustomView:(UIView*)view;

/**
 * Gets Title's custom view
 */
- (UIView*)titleCustomView;

@end

#pragma mark - SCIAxisCore default implementation

@class SCITickCoordinates;
@protocol SCIDeltaCalculatorProtocol;
@protocol SCITickCoordinatesProviderProtocol;
@protocol SCILabelProviderProtocol;
@class SCIAxisResizeAnimationHelper;
@class SCIRangeChangedCallbackHandler;

/**
 * @brief Provides base class for 2D Axis types throughout the SciChart SDK
 */
@interface SCIAxisCore : NSObject <SCIAxisCoreProtocol> {
    @protected
    __weak id<SCIChartSurfaceProtocol> _parentSurface;
}

/**
 * Gets or sets the parent that this Axis belongs to
 * @see SCIChartSurfaceProtocol
 */
@property (nonatomic, weak) id<SCIChartSurfaceProtocol> parentSurface;

/**
 * Gets or sets the axis title
 */
@property (nonatomic, copy) NSString * axisTitle;

/**
 * Gets or sets a flag indicating whether to flip the tick and pixel coordinate generation for this axis, causing the axis ticks to decrement and chart to be flipped in the axis direction
 */
@property (nonatomic) BOOL flipCoordinates;

/**
 * Gets or sets the TextFormatting string for tick labels on this axis. Should be C format string
 */
@property (nonatomic, copy) NSString * textFormatting;

/**
 * Gets or sets the minimal zoom constrain of the axis
 * @discussion Used to set the minimum distance between Min and Max of the VisibleRange
 */
@property (nonatomic) SCIGenericType minimalZoomConstrain;

/**
 * Gets or sets the maximum zoom constrain of the axis
 * @discussion Used to set the maximum distance between Min and Max of the VisibleRange
 */
@property (nonatomic) SCIGenericType maximalZoomConstrain;

/**
 * Gets or sets the number of minor delta ticks per major tick
 */
@property (nonatomic) int minorsPerMajor; // minor ticks count between major ticks

/**
 * Gets or sets the max ticks
 */
@property (nonatomic) int maxAutoTicks; // max amount of major ticks

/**
 * Gets or sets value, that indicates whether calculate ticks automatically. Default is true
 */
@property (nonatomic) BOOL autoTicks; // if disabled minorDelta and majorDelta are not calculated and have to be set manually

/**
 * Gets or sets a SCITickProvider instance on current axis
 * Used to compute the data-values of axis gridlines, ticks and labels
 */
@property (nonatomic, strong) id<SCITickProviderProtocol> tickProvider;

/**
 * Gets or sets AutoRange mode
 * @see SCIAutoRange
 */
@property (nonatomic) SCIAutoRange autoRange;

/**
 * Gets or sets the text formatting string for labels on this cursor. Should be C format string
 */
@property (nonatomic, copy) NSString * cursorTextFormatting;

/**
 * Gets or sets whether the current axis is an X-Axis or not
 */
@property (nonatomic) BOOL isXAxis;

/**
 * Gets or sets a SCITickCoordinatesProvider instance on current axis
 * @discussion Used to transform the data-values received from TickProvider instance to the coordinates for Axis gridlines, ticks and labels drawing
 */
@property (nonatomic, strong) id<SCITickCoordinatesProviderProtocol> tickCoordinatesProvider;

/**
 * Gets or sets whether current Axis is a static axis
 */
@property (nonatomic) BOOL isStaticAxis;

/**
 * Gets or sets a SCILabelProvider instance
 * @discussion Used to programmatically override the formatting of text and cursor labels
 */
@property (nonatomic, strong) id<SCILabelProviderProtocol> labelProvider;

/**
 * Gets or sets the animated VisibleRange of the Axis
 * @discussion When this property is set, the axis animates the Visible Range to the new value over a duration
 */
@property (nonatomic) BOOL animateVisibleRangeChanges;

/**
 * Gets or sets the Duration used when animates the visible range of the axis to the destination visible range
 * @see SCIRange
 */
@property (nonatomic) double animatedChangeDuration;

/** 
 * Gets a value indicating whether this instance is a category axis
 */
- (BOOL)isCategoryAxis;

/** Returns an undefined SCIRange, called internally by SciChart to reset the Visible Range of an axis to an undefined state
 * @see SCIRangeProtocol
 */
- (id<SCIRangeProtocol>)getUndefinedRange;

/** Returns a defulat non zero SCIRange, called internally by SciChart to reset the Visible Range of an axis to an undefined state
 * @see SCIRangeProtocol
 */
- (id<SCIRangeProtocol>)getDefaultNonZeroRange;

/**
 * Checks whether the range is of valid type for this axis
 * @param range Range to check
 */
- (BOOL)isRangeOfValidType:(id<SCIRangeProtocol>)range;

/**
 * When overridden in derived class, changes value of the VisibleRange according to axis requirements before it is applied
 */
- (void)coerceVisibleRange;

/**
 * Checks if the VisibleRange is valid, e.g. is not nil, the difference between Max and Min is positive
 */
- (BOOL)isVisibleRangeValid;

/**
 * Overridden by derived types, called internally to calculate MinorTicks, MajorTicks before Axis drawing
 */
- (SCITickCoordinates *)CalculateTicks;

/**
 * Calculates the deltas for use in this render pass
 */
- (void)calculateDelta;

/**
 * Returns an instance of a SCIDeltaCalculator which is used to compute the data-values of MajorDelta, MinorDelta
 * @discussion Overridden by derived types to allow calculations specific to that axis type
 * @return SCIDeltaCalculatorProtocol instance
 */
- (id<SCIDeltaCalculatorProtocol>)getDeltaCalculator;

/**
 * Calculates max auto ticks amount, which is >= 1
 */
- (uint)getMaxAutoTicks;

/**
 * Asserts the type passed in is supported by the current axis implementation
 * @param range Range type
 * @see SCIDataType
 */
- (void)assertRangeType:(id<SCIRangeProtocol>)range;

/**
 @brief Axis visible range animation controller.
 @discussion For internal use.
 */
@property (nonatomic) SCIAxisResizeAnimationHelper * animationController;
/**
 @brief Axis visible range changes callback controller.
 @discussion For internal use.
 */
@property (nonatomic) SCIRangeChangedCallbackHandler * rangeCallbackHandler;

@end

/** @}*/
