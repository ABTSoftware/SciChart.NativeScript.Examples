//
//  SCIDataSeries.h
//  SciChart
//
//  Created by Admin on 07.07.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup DataSeries
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIGenericType.h"
#import "SCIResamplingMode.h"
#import "SCICallbackBlock.h"
#import "SCIEnumerationConstants.h"


/**
 * All posible types of data series.
 */
typedef NS_ENUM(int, SCIDataSeriesType) {
    SCIDataSeriesType_Xy,
    SCIDataSeriesType_Ohlc,
    SCIDataSeriesType_HeatMap,
    SCIDataSeriesType_Xyy,
    SCIDataSeriesType_Xyz
};

@class SCIArrayController, SCIIndexRange;
@protocol SCIDataDistributionCalculatorProtocol, SCIArrayControllerProtocol, SCIPointResamplerProtocol, SCIPointSeriesProtocol, SCIRangeProtocol;

#pragma mark - SCIDataSeries protocol
/**
 * @brief Provides protocol for data container for renderable series
 */
@protocol SCIDataSeriesProtocol ///
<NSObject>
/** @{ @} */

@optional

/**
 * After setting the property if previously data series wasn't fifo xColumn and yColumn will be recreated with type SCIArrayControllerFIFO.
 */
@property (nonatomic) int fifoCapacity; // Capacity of the FIFO buffer.

/**
 * Allowing to accept unsorted data. Default is NO. If try to append unsorted data when acceptUnsortedData = NO, exception will be raised with text "Data series can accepts only sorted data".
 * It was done for better performance while data processing. Unsorted data has different approach for data processing, and the approach can have lower performance.
 */
@property (nonatomic) BOOL acceptUnsortedData;

@required

/**
 * SeriesName is shown in legend modifier and tooltip modifier.
 */
@property (nonatomic, copy, nullable) NSString * seriesName; // Name of dataSeries, which is used in tooltip, legend and hittest modifier.

/**
 * Last resampled point series which was used for drawing the dataSeries.
 */
@property (nonatomic, strong, nullable) id<SCIPointSeriesProtocol> lastPointSeries;

/**
 * Callback is called every time when somthing chages in data series (appending new values, removing, inserting).
 * @code
 *
 * let dataSeriesXy = SCIXyDataSeries(xType: .double, yType: .double)
 * dataSeriesXy?.onDataSeriesChanged = {() -> () in return
 *   print(dataSeriesXy?.count()) // Add some code here which will be run when data series is changed
 * }
 * dataSeriesXy?.appendX(SCIGeneric(2.0), y: SCIGeneric(3.0))
 *
 * @endcode
 */
@property (nonatomic, copy, nullable) SCIActionBlock onDataSeriesChanged;

/**
 * Returns type of x column.
 */
-(SCIDataType) xType;

/**
 * Returns type of y column.
 */
-(SCIDataType) yType;

/**
 * Returns range with min and max values. If data series is sorted it takes first and last values of x column, if it's not sorted it checks every value in x column to find min and max.
 */
-(nonnull id<SCIRangeProtocol>) getXRange;

/**
 * Returns range with min and max values. If data series is sorted it takes first and last values of y column, if it's not sorted it checks every value in y column to find min and max.
 */
-(nonnull id<SCIRangeProtocol>) getYRange;

/**
 * Return current type of data series.
 * @see SCIDataSeriesType
 */
-(SCIDataSeriesType) dataSeriesType;

/**
 * Return SCIArrayController for x Column.
 */
-(nonnull id<SCIArrayControllerProtocol>) xValues;

/**
 * Return SCIArrayController for y Column.
 */
-(nonnull id<SCIArrayControllerProtocol>) yValues;

/**
 * Return min y value from y Column.
 */
-(SCIGenericType) YMin;

/**
 * Return max y value from y Column.
 */
-(SCIGenericType) YMax;

/**
 * Return min x value from x Column.
 */
-(SCIGenericType) XMin;

/**
 * Return max x value from x Column.
 */
-(SCIGenericType) XMax;

/**
 * Returns YES if the dataSeries has any values.
 */
-(BOOL) hasValues;

/**
 * Use to return count of appended data.
 */
-(int) count;

/**
 * Returns YES if data which was appended is sorted.
 */
-(BOOL) isSorted;

/**
 * Returns YES if data series uses FIFO principle.
 */
-(BOOL) isFifo;

/**
 * Use to clear all data in all arrayControllers, also should clear dataDestributionCalculator.
 */
-(void) clear;

/**
 * Converts range of values to the range of indices.
 */
-(nonnull SCIIndexRange *) getIndicesRangeWithVisibleRange:(nonnull id <SCIRangeProtocol>)visibleRange;

/**
 * Returns y range for some specific x range.
 */
-(nonnull id<SCIRangeProtocol>) getWindowYRangeWithXRange:(nonnull id<SCIRangeProtocol>)xRange;
-(nonnull id<SCIRangeProtocol>) getWindowYRangeWithXRange:(nonnull id<SCIRangeProtocol>)xRange GetPositiveRange:(BOOL)getPositiveRange;

/**
 * Returns y range of values for some specific x range of indices.
 */
-(nonnull id<SCIRangeProtocol>) getWindowYRangeWithIndexRange:(nonnull SCIIndexRange *)xIndexRange;
-(nonnull id<SCIRangeProtocol>) getWindowYRangeWithIndexRange:(nonnull SCIIndexRange *)xIndexRange GetPositiveRange:(BOOL)getPositiveRange;

/**
 * Get index of value in SCIArrayController. 
 * @see SCIArraySearchMode
 */
-(int) findIndexForValue:(SCIGenericType)x Mode:(SCIArraySearchMode)searchMode;

/**
 * Add new value for existing data.
 * @see SCIGenericType
 * @code
 * // Swift 3 Example
 * let dataSeriesXy = SCIXyDataSeries(xType: .double, yType: .double)
 * dataSeriesXy?.appendX(SCIGeneric(2.0), y: SCIGeneric(3.0))
 * @endcode
 */
-(void) appendX:(SCIGenericType)x Y:(SCIGenericType)y;

/**
 * Delete some value at index.
 */
-(void) removeAt:(int)index;

/**
 * Delete particular value from xColumn.
 */
-(void) removeValue:(SCIGenericType)value;

/**
 * Add array of values. Input parameteres can be array of any object which implements method "doubleValue"(e.g. NSNumber, NSString). Also ensure that arrays are equal or you will have exception with text "DataSeries can operate only on arrays with equal size"
 * @code
 * // Swift 3 Example
 * let dataSeriesXy = SCIXyDataSeries(xType: .double, yType: .double)
 * let xArray = [2, 3, 5, 6, 7];
 * let yArray = [3, 6, 9, 1, 2];
 * dataSeriesXy?.appendRangeX(xArray, y: yArray)
 * @endcode
 */
-(void) appendRangeX:(nonnull NSArray*)x Y:(nonnull NSArray*)y;

/**
 * Add array of values. You can create SCIGenerirType instance with C array and pass it through input parameters. Also you should pass size of array into parameter count.
 */
-(void) appendRangeX:(SCIGenericType)x Y:(SCIGenericType)y Count:(int)count;

/**
 * Remove some "count" of values starting from "startIndex".
 */
-(void) removeRangeFrom:(int)startIndex Count:(int)count;

/**
 * Returns copy of current instance.
 */
-(nullable id<SCIDataSeriesProtocol>) clone;

/**
 * For private using.
 */
-(nonnull id <SCIPointSeriesProtocol>) toPointSeriesWithResamplingMode:(SCIResamplingMode)resamplingMode
                                                         SCIIndexRange:(nonnull __unsafe_unretained SCIIndexRange*)indexRange
                                                         ViewportWidth:(int)viewportWidth
                                                        IsCategoryAxis:(BOOL)isCategoryAxis
                                                          VisibleRange:(nonnull __unsafe_unretained id<SCIRangeProtocol>)visibleRange
                                                             Resampler:(nonnull __unsafe_unretained id<SCIPointResamplerProtocol>)resampler;

/**
 * For private using.
 */
-(double) getYMinAt:(int) index ExistingYMin:(double)existingYMin;

/**
 * For private using.
 */
-(double) getYMaxAt:(int) index ExistingYMax:(double)existingYMax;

@end

#pragma mark - SCIDataSeries deafault implementation

@class SCIMathOperations;


typedef NS_ENUM(int, SCITypeOfDataSeries) {
    SCITypeOfDataSeries_XCategory,
    SCITypeOfDataSeries_YCategory,
    SCITypeOfDataSeries_XYCategory,
    SCITypeOfDataSeries_Fifo,
    SCITypeOfDataSeries_DefaultType
};


/**
 * It is a data source for SCIRenderableDataSeriesBase.
 * @see SCIRenderableSeriesBase
 */
@interface SCIDataSeries : NSObject <SCIDataSeriesProtocol> {
    @protected
    id<SCIArrayControllerProtocol> _xColumn;
    id<SCIArrayControllerProtocol> _yColumn;
    SCIActionBlock _onDataSeriesChanged;

    id<SCIRangeProtocol> _yRange;
    id<SCIRangeProtocol> _xRange;
    BOOL _yRangeValid;
    BOOL _xRangeValid;
}

/**
 * Initializers which set types for x column and y column by passed SeriesType.
 * @see SCIDataType
 * @see TypeOfSeries
 */
- (nonnull id)initWithXType:(SCIDataType)xType YType:(SCIDataType)yType SeriesType:(SCITypeOfDataSeries) seriesType;

/**
 * Data source for x Axis. Can be instance of SCIArrayControllerFIFO, SCIArrayController, SCICategoryArrayController
 * @see SCIArrayControllerFIFO
 * @see SCIArrayController
 * @see SCICategoryArrayController
 */
@property (nonatomic, strong, nonnull) id<SCIArrayControllerProtocol> xColumn;

/**
 * Data source for y Axis. Can be instance of SCIArrayControllerFIFO, SCIArrayController, SCICategoryArrayController
 * @see SCIArrayControllerFIFO
 * @see SCIArrayController
 * @see SCICategoryArrayController
 */
@property (nonatomic, strong, nonnull) id<SCIArrayControllerProtocol> yColumn;

/**
 *
 */
@property (nonatomic, strong, nullable) id<SCIDataDistributionCalculatorProtocol> dataDistributionCalculator;

/**
 * Calls onDataSeriesChanged callback.
 */
- (void)dataSeriesChanged;

/**
 * Cleares all data in all columns.
 */
- (void)clearColumns;

@end

/** @}*/
