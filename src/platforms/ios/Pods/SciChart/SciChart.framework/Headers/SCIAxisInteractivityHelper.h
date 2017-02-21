//
//  AxisInteractivityHelper.h
//  SciChart
//
//  Created by Admin on 16.07.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup Axis
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIEnumerationConstants.h"

@protocol SCIRangeProtocol;

#pragma mark - SCIAxisInteractivityHelper protocol

/**
 *
 */
@protocol SCIAxisInteractivityHelperProtocol ///
<NSObject>
/** @{ @} */

@required
-(id<SCIRangeProtocol>) zoom:(id<SCIRangeProtocol>)initialRange From:(double)fromCoord To:(double)toCoord;
-(id<SCIRangeProtocol>) zoom:(id<SCIRangeProtocol>)initialRange ByMin:(double)minFraction Max:(double)maxFraction;
-(id<SCIRangeProtocol>) scrollInMinDirection:(id<SCIRangeProtocol>)rangeToScroll ForPixels:(double)pixels;
-(id<SCIRangeProtocol>) scrollInMaxDirection:(id<SCIRangeProtocol>)rangeToScroll ForPixels:(double)pixels;
-(id<SCIRangeProtocol>) scroll:(id<SCIRangeProtocol>)rangeToScroll ForPixels:(double)pixels;
-(id<SCIRangeProtocol>) clipRange:(id<SCIRangeProtocol>)rangeToClip ToMaximum:(id<SCIRangeProtocol>)maximumRange ClipMode:(SCIZoomPanClipMode)clipMode;

@end

@protocol SCICoordinateCalculatorProtocol;

#pragma mark - SCIAxisInteractivityHelper default implementation

@interface SCIAxisInteractivityHelper : NSObject <SCIAxisInteractivityHelperProtocol>

-(id)initWithCoordinateCalculator:(id<SCICoordinateCalculatorProtocol>)coordCalculator;

@end

/** @}*/