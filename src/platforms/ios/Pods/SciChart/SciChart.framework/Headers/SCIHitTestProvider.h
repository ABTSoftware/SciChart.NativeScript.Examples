//
//  HitTestProvider.h
//  SciChart
//
//  Created by Admin on 08.12.15.
//  Copyright © 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup HitTest
 *  @{
 */

#import "SCIGenericType.h"

@protocol SCIRenderPassDataProtocol;

@protocol SCIHitTestProviderProtocol <NSObject>

typedef NS_ENUM(int, SCIHitTestMode) {
    SCIHitTest_Default,
    SCIHitTest_Point,
    SCIHitTest_Vertical,
    SCIHitTest_Interpolate,
    SCIHitTest_VerticalInterpolate,
};

typedef struct {
    BOOL match;
    int index;
    double x;
    double y;
    SCIGenericType xValue;
    SCIGenericType yValue;
    SCIGenericType xValueInterpolated;
    SCIGenericType yValueInterpolated;
    SCIGenericType y2Value;
    SCIGenericType y2ValueInterpolated;
    SCIGenericType zValue;
    SCIGenericType zValueInterpolated;
    SCIGenericType openValue;
    SCIGenericType highValue;
    SCIGenericType lowValue;
    SCIGenericType closeValue;
    double radius;
} SCIHitTestResult;

@property (nonatomic) SCIHitTestMode hitTestMode;

-(SCIHitTestResult) hitTestAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data;

-(SCIHitTestResult) hitTestVerticalAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data;

-(SCIHitTestResult) hitTestAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data Mode:(SCIHitTestMode)mode;

-(SCIHitTestResult) hitTestPointModeAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data;

-(SCIHitTestResult) hitTestInterpolateModeAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data;

-(SCIHitTestResult) hitTestVerticalModeAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data;

-(SCIHitTestResult) hitTestVerticalInterpolateModeAtX:(double)x Y:(double)y Radius:(double)radius onData:(id<SCIRenderPassDataProtocol>)data;

@end

/** @}*/
