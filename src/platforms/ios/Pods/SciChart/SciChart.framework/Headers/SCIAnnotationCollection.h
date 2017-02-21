//
//  SCIAnnotationGroup.h
//  SciChart
//
//  Created by Admin on 29.03.16.
//  Copyright © 2016 SciChart Ltd. All rights reserved.
//

/** \addtogroup Annotations
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIAnnotationBase.h"

@class SCILineAnnotationStyle;

/**
 * @brief Provides a class for annotation group to be rendered over the chart
 * @discussion Is used when there is a need to have multiple annotations
 */
@interface SCIAnnotationCollection : SCIAnnotationBase

/**
 * @brief Provides default initialization of the current annotation group with an array of annotations
 * @code
 let annotationGroup = SCIAnnotationGroup(childAnnotations: [boxBlue, boxRed, lineAnnotationRelative, xMarker, yMarker])
 
 chartSurface.annotation = annotationGroup
 * @endcode
 */
-(id) initWithChildAnnotations:(NSArray*)childAnnotations;

/**
 * @brief Adds annotation into the current annotation group
 @code
 annotationGroup.addItem(textAnnotation)
 @endcode
 */
-(void) addItem:(id<SCIAnnotationProtocol>)item;

/**
 * @brief Deletes annotation from the current annotation group
 @code
 annotationGroup.removeItem(textAnnotation)
 @endcode
 */
-(void) removeItem:(id<SCIAnnotationProtocol>)item;

/**
 * @brief Deletes annotation from the current annotation group in custom position
 @code
 annotationGroup.removeAt(3)
 @endcode
 */
-(void) removeAt:(int)index;

/**
 * @brief Returns annotations quantity from the current annotation group
 */
-(int) itemCount;

/**
 * @brief Returns SCIAnnotation from the current annotation group by annotation name
 */
-(id<SCIAnnotationProtocol>) itemByName:(NSString *)name;

/**
 * @brief Returns SCIAnnotation from the current annotation group by annotation index in group
 */
-(id<SCIAnnotationProtocol>) itemAt:(int)index;

/**
 * @brief if set to true gesture is handled only by one annotation.
 * @discussion Gesture considered handled if annotation returns true from onTapGesture:At: onPanGetsure:At: and oher handler methods from SCIGestureEventsHandler
 * @see SCIGestureEventsHandler
 */
@property (nonatomic) BOOL handleGestureFirstOnly;

@end

/** @}*/
