//
//  SCICandlestickSeriesStyle.h
//  SciChart
//
//  Created by Admin on 25.11.15.
//  Copyright © 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup Themes
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCICallbackBlock.h"
#import "SCIStyle.h"

@protocol SCIPen2DProtocol;
@protocol SCIBrush2DProtocol;

/**
 * @brief The SCICandlestickSeriesStyle class.
 * @discussion Provides styling capabilities for SCIFastCandlestickRenderableSeries within SciChart.
 * @see SCIFastCandlestickRenderableSeries
 */
@interface SCICandlestickSeriesStyle : NSObject <SCIStyleProtocol, NSCopying>

// TODO: reaname wick to week!!!

/**
 * @brief defines week pen and body outline for chart Up mode (open < close)
 * @code
 * style.upWickPen = SCIPenSolid(colorCode: 0xFF00FF00, width: 1)
 * @encode
 * @see SCIPen2DProtocol
 */
@property (nonatomic, strong) id<SCIPen2DProtocol> strokeUpStyle;

/**
 * @brief defines week pen and body outline for chart Down mode (open > close)
 * @code
 * style.downWickPen = SCIPenSolid(colorCode: 0xFF0000FF, width: 1)
 * @encode
 * @see SCIPen2DProtocol
 */
@property (nonatomic, strong) id<SCIPen2DProtocol> strokeDownStyle;

/**
 * @brief defines body fill for chart Up mode (open < close)
 * @code
 * style.upBodyBrush = SCIBrushSolid(colorCode: 0xFF00FF00)
 * @encode
 * @see SCIBrush2DProtocol
 */
@property (nonatomic, strong) id<SCIBrush2DProtocol> fillUpBrushStyle;

/**
 * @brief defines body fill for chart Down mode (open > close)
 * @code
 * style.downBodyBrush = SCIBrushSolid(colorCode: 0xFF0000FF)
 * @encode
 * @see SCIBrush2DProtocol
 */
@property (nonatomic, strong) id<SCIBrush2DProtocol> fillDownBrushStyle;

/**
 * @brief If property set to true, candle body is drawn with outline
 */
@property (nonatomic) BOOL drawBorders;

/**
 * @brief relative width of candle body
 * @discussion Valid values are from 0 to 1, where 0 - no body, 1 - no space between candles
 * @discussion Default value is 0.7
 */
@property (nonatomic) double dataPointWidth;

@end

/** @} */
