//
//  FastCandlestickRenderableSeries.h
//  SciChart
//
//  Created by Admin on 24.11.15.
//  Copyright © 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup RenderableSeries
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIRenderableSeriesBase.h"
#import "SCIThemebleProtocol.h"

@class SCICandlestickSeriesStyle;

/**
 @brief The SCIFastCandlestickRenderableSeries class.
 @discussion Provides Candlestick series rendering where each data point displayed as candle with rectangular body and line from min to max value.
 @discussion Candlestick series has two color schemes for Up and Down mode. If open value is higher than close, data point is drawn in Down mode, else in Up mode
 @remark Designed to work with SCIOhlcDataSeries as data container
 @remark For styling provide or customize SCICandlestickSeriesStyle
 @see SCIRenderableSeriesProtocol
 @see SCIRenderableSeriesBase
 @see SCIOhlcDataSeries
 @see SCICandlestickSeriesStyle
 */
@interface SCIFastCandlestickRenderableSeries : SCIRenderableSeriesBase <SCIThemebleProtocol>

/**
 @brief Get or set style for visual customization
 @see SCICandlestickSeriesStyle
 */
@property (nonatomic, copy) SCICandlestickSeriesStyle * style;

/**
 @brief Gets or sets selected series style
 @discussion If set to nil selected style is default series style
 */
@property (nonatomic, copy) SCICandlestickSeriesStyle * selectedStyle;

@end

/** @}*/
