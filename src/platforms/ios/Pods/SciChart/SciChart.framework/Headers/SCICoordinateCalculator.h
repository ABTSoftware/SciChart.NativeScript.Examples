//
//  SCICoordinateCalculator.h
//  SciChart
//
//  Created by Admin on 13.07.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup CoordinateCalculators
 *  @{
 */

@protocol SCIRangeProtocol;

typedef double (*SCICoordinateCalculatorCoordFunction)(void * info, double value);

typedef struct {
    void * info;
    SCICoordinateCalculatorCoordFunction converter;
} SCICoordinateCalculatorHelper;

/**
 */
@protocol SCICoordinateCalculatorProtocol ///
<NSObject>
/** @{ @} */

@required
-(BOOL) isCategoryAxisCalculator;
-(BOOL) isLogarithmicAxisCalculator;
-(BOOL) isHorizontalAxisCalculator;
-(BOOL) isXAxisCalculator;
-(BOOL) hasFlippedCoordinates;
-(BOOL) isPolarAxisCalculator;
-(double) coordinatesOffset;
-(double) getCoordinateFromDate:(NSDate*)dataValue;
-(double) getCoordinateFrom:(double)dataValue;
-(double) getDataValueFrom:(double)pixelCoordinate;
-(id<SCIRangeProtocol>) translateByPixels:(double)pixels InputRange:(id<SCIRangeProtocol>)inputRange;
-(id<SCIRangeProtocol>) translateByMinFraction:(double)minFraction MaxFraction:(double)maxFraction InputRange:(id<SCIRangeProtocol>)inputRange;

-(SCICoordinateCalculatorHelper) getCalculatorHelper;

@end

/** @}*/