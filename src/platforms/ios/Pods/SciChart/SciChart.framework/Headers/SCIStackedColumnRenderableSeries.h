//
//  SCIStackedColumnRenderableSeries.h
//  SciChart
//
//  Created by Mykola Hrybeniuk on 9/24/16.
//  Copyright © 2016 SciChart. All rights reserved.
//

#import "SCIColumnSeriesStyle.h"
#import "SCIRenderableSeriesBase.h"
#import "SCIStackedRenderableSeries.h"
#import "SCIThemebleProtocol.h"

/**
 *
 */
@interface SCIStackedColumnRenderableSeries : SCIRenderableSeriesBase <SCIStackedRenderableSeriesProtocol, SCIThemebleProtocol>

/*!
 @brief The SCIStackedColumnRenderableSeries class' property.
 @discussion Gets or sets the SCIStackedColumnRenderableSeries Style property.
 */
@property (nonatomic, copy) SCIColumnSeriesStyle * style;

/**
 @brief Gets or sets SCIColumnSeriesStyle Selected style property.
 @discussion If set to nil selected style is default series style
 */
@property (nonatomic, copy) SCIColumnSeriesStyle * selectedStyle;

@end
