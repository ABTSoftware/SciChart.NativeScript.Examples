//
//  FastMountainRenderableSeries.h
//  SciChart
//
//  Created by Admin on 06.10.15.
//  Copyright (c) 2015 SciChart Ltd. All rights reserved.
//

/** \addtogroup RenderableSeries
 *  @{
 */

#import <Foundation/Foundation.h>
#import "SCIRenderableSeriesBase.h"
#import "SCIThemebleProtocol.h"

@class SCIMountainSeriesStyle;

/**
 @brief The SCIFastMountainRenderableSeries class.
 @discussion This renderable series displays filled area from zero line to data points with outline (connecting data points) as option
 @remark Designed to work with SCIXyDataSeries as data container
 @remark For styling provide or customize SCIMountainSeriesStyle
 @see SCIRenderableSeriesProtocol
 @see SCIRenderableSeriesBase
 @see SCIXyDataSeries
 @see SCIMountainSeriesStyle
 */
@interface SCIFastMountainRenderableSeries : SCIRenderableSeriesBase <SCIThemebleProtocol>

/**
 @brief Get or set style for visual customization
 @see SCIMountainSeriesStyle
 */
@property (nonatomic, copy) SCIMountainSeriesStyle * style;

/**
 @brief Gets or sets selected series style
 @discussion If set to nil selected style is default series style
 */
@property (nonatomic, copy) SCIMountainSeriesStyle * selectedStyle;

@end

/** @}*/
