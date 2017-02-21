//
//  SCIPanModifier.h
//  SciChart
//
//  Created by Mykola Hrybeniuk on 11/30/16.
//  Copyright © 2016 SciChart. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SCIGestureModifier.h"

/**
 * The class implements base functionality for modifiers which uses pan gesture. For example inertial scroll.
 */
@interface SCIPanModifier : SCIGestureModifier

/**
 * Options for customization inertial scroll. For example if timeIntervalReductionOfInertialSpeed = 1 and slowDownInertialSpeedMultiplier = 2, it means that our inertial scroll speed is deacresed every sconds in two times.
 */
@property (nonatomic) float timeIntervalReductionOfInertialSpeed; // Default is 0.15f
@property (nonatomic) float slowDownInertialSpeedMultiplier; // Default is 2.f

- (void)performPanFrom:(CGPoint)lastPoint To:(CGPoint)currentPoint;
- (void)performPanFrom:(CGPoint)lastPoint To:(CGPoint)currentPoint withAnimationDuration:(float)duration;
- (void)inertialScrollWithLastPoint:(CGPoint)lastPoint andVelocity:(CGPoint)velocity;
- (void)stopInertialScroll;

@end
