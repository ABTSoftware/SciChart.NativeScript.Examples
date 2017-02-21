//
//  SCIModifierGroup.h
//  SciChart
//
//  Created by Admin on 05.08.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup ChartModifiers
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIGestureModifier.h"
#import "SCIThemebleProtocol.h"

@interface SCIModifierGroup : SCIGestureModifier <SCIThemebleProtocol>

-(id) initWithChildModifiers:(NSArray<id<SCIChartModifierProtocol>>*)childModifiers;

-(void) addItem:(id<SCIChartModifierProtocol>)item;
-(void) removeItem:(id<SCIChartModifierProtocol>)item;
-(void) removeAt:(int)index;
-(int) itemCount;
-(id<SCIChartModifierProtocol>) itemByName:(NSString *)name;
-(id<SCIChartModifierProtocol>) itemAt:(int)index;

@property (nonatomic) BOOL handleGestureFirstOnly;

@end

/** @}*/
