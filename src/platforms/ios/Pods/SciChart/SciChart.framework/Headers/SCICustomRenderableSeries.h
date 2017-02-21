//
//  SCICustomRenderableSeries.h
//  SciChart
//
//  Created by Admin on 29/12/16.
//  Copyright © 2016 SciChart. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SCIRenderableSeriesBase.h"

@interface SCICustomRenderableSeries : SCIRenderableSeriesBase

-(id<SCIRangeProtocol>) getYRange:(id<SCIRangeProtocol>)xRange Positive:(BOOL)getPositiveRange;

-(id<SCIRangeProtocol>)getXRange;

-(SCISeriesInfo*) toSeriesInfoWithHitTest:(SCIHitTestResult)info;

-(id<SCIHitTestProviderProtocol>) hitTestProvider;

-(UIColor *) seriesColor;

-(void)internalDrawWithContext:(id<SCIRenderContext2DProtocol>)renderContext WithData:(id<SCIRenderPassDataProtocol>)renderPassData;

@end
