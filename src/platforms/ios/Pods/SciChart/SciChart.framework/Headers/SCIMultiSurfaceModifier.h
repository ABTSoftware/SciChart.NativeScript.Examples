//
//  SCIMultiSurfaceModifier.h
//  SciChart
//
//  Created by Admin on 08/07/16.
//  Copyright © 2016 SciChart. All rights reserved.
//

/** \addtogroup ChartModifiers
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIChartModifier.h"
#import "SCIGestureEventsHandler.h"

@interface SCIMultiSurfaceModifier : NSObject <SCIChartModifierProtocol, SCIGestureEventsHandlerProtocol>

@property (nonatomic, copy, nonnull) NSString *modifierName;
@property (nonatomic) BOOL isEnabled;
@property (nonatomic) BOOL autoPassAreaCheck;

-(nonnull instancetype)initWithModifierType:(nonnull Class<SCIChartModifierProtocol, SCIGestureEventsHandlerProtocol>)modifier;
-(nullable id<SCIChartModifierProtocol, SCIGestureEventsHandlerProtocol>)modifierForSurface:(nullable id<SCIChartSurfaceProtocol>)surface;

-(void)disconnectSurface:(nonnull id<SCIChartSurfaceProtocol>)surface;
-(void)disconnectSurfaces;

@end

/** @}*/
