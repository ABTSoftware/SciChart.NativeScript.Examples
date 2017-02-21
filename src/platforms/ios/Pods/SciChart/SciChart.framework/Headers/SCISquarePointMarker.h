//
//  SquarePointMarker.h
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
 @brief Point marker with rectangular shape
 @see SCIPointMarkerProtocol
 */
@interface SCISquarePointMarker : SCIPointMarkerBase

/**
 @brief Defines point marker fill color
 @code
 marker.fillBrush = SCIBrushSolid(colorCode: 0xFF00A0FF)
 @encode
 @see SCIBrush2DProtocol
 */
@property (nonatomic, strong) id<SCIBrush2DProtocol> fillBrush;
/**
 @brief Defines point marker outline thickness and color
 @code
 style.borderPen = SCIPenSolid(colorCode: 0xFF00A0FF, width: 1)
 @encode
 @see SCIPen2DProtocol
 */
@property (nonatomic, strong) id<SCIPen2DProtocol> borderPen;

/**
 @brief If true point marker will have borders
 */
@property (nonatomic) BOOL drawBorder;

@end

/** @}*/