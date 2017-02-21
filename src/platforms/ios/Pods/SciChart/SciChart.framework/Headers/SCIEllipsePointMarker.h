//
//  EllipsePointMarker.h
//  SciChart
//
//  Created by Admin on 26.11.15.
//  Copyright © 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup PointMarkers
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIPointMarkerBase.h"

@protocol SCIPen2DProtocol;
@protocol SCIBrush2DProtocol;

/**
 @brief Point marker with elliptic shape
 @see SCIPointMarkerProtocol
 */
@interface SCIEllipsePointMarker : SCIPointMarkerBase

/**
 @brief Defines point marker fill color
 @code
 marker.fillBrush = SCIBrushSolid(colorCode: 0xFF00A0FF)
 @encode
 @see SCIBrush2D
 */
@property (nonatomic, strong) id<SCIBrush2DProtocol> fillBrush;
/**
 @brief Defines point marker outline thickness and color
 @code
 style.borderPen = SCIPenSolid(colorCode: 0xFF00A0FF, width: 1)
 @encode
 @see SCIPen2D
 */
@property (nonatomic, strong) id<SCIPen2DProtocol> borderPen;
/**
 * @brief Defines ellipse level of detalization or number of edges
 * @discussion The higher value, the better looking circle will be. But it can hit performance, especially with outlines turned on
 * @discussion Default value is 20
 */
@property (nonatomic) int detalization;
/**
 @brief If true point marker will have borders
 */
@property (nonatomic) BOOL drawBorder;

@end

/** @}*/