//
//  MountainSeriesStyle.h
//  SciChart
//
//  Created by Admin on 22.10.15.
//  Copyright © 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup Themes
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCICallbackBlock.h"
#import "SCIStyle.h"

@protocol SCIBrush2DProtocol;
@protocol SCIPen2DProtocol;

/**
 * @brief The SCIMountainSeriesStyle class.
 * @discussion Provides styling capabilities for SCIFastMountainRenderableSeries within SciChart.
 * @see SCIFastMountainRenderableSeries
 */
@interface SCIMountainSeriesStyle : NSObject <SCIStyleProtocol, NSCopying>

/**
 * @brief Defines mountain area fill color
 * @code
 * style.areaBrush = SCIBrushSolid(colorCode: 0xFFA0A050)
 * @encode
 * @see SCIBrush2DProtocol
 */
@property (nonatomic, strong) id<SCIBrush2DProtocol> areaBrush;

/**
 * @brief Defines mountain area outline color and width
 * @code
 * style.borderPen = SCIPenSolid(colorCode: 0xFFF0F050, width: 1)
 * @encode
 * @see SCIPen2DProtocol
 */
@property (nonatomic, strong) id<SCIPen2DProtocol> borderPen;

/**
 * @brief If true mountain area outline will be digital (jagged)
 */
@property (nonatomic) BOOL isDigitalLine;

@end

/** @} */