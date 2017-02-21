//
//  SCIAxisMarkerAnnotation.h
//  SciChart
//
//  Created by Admin on 27/07/16.
//  Copyright © 2016 SciChart. All rights reserved.
//

/** \addtogroup Annotations
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIAnnotationBase.h"

@class SCIAxisMarkerAnnotationStyle;

@interface SCIAxisMarkerAnnotation : SCIAnnotationBase

/**
 * Gets or sets the AxisMarkerAnnotation  style
 * @discussion The variety of preperties can be set here, e.g. text color, background color, margin, etc.
 * @code
 let averageMarker = SCIAxisMarkerAnnotation()
 averageMarker.style.backgroundColor = UIColor.fromColorCode(0xFF00a5ff)
 chartSurface.annotation = averageMarker
 * @endcode
 * @see SCILineAnnotationStyle
 */
@property (nonatomic, copy) SCIAxisMarkerAnnotationStyle * style;

/**
 * Gets the formatted string value of the AxisMarkerAnnotation
 */
@property (nonatomic, copy) NSString * formattedValue;

/**
 * Gets or sets the position of the AxisMarkerAnnotation
 * @code
 let lastMarker = SCIAxisMarkerAnnotation()
 lastMarker.position = SCIGeneric(34)
 * @endcode
 * @see SCIAnnotationCoordMode
 */
@property (nonatomic) SCIGenericType position;


/**
 * Formats the value of the AxisMarkerAnnotation
 */
-(NSString *) formatValue:(SCIGenericType)value;

@end

/** @}*/
