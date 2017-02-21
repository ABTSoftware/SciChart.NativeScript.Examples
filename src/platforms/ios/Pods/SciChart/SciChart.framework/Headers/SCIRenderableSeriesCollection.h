//
//  SCIRenderableSeriesCollection.h
//  SciChart
//
//  Created by Admin on 17/01/17.
//  Copyright © 2017 SciChart. All rights reserved.
//

#import <Foundation/Foundation.h>

@class SCIChartSurface;
@protocol SCIRenderableSeriesProtocol;

/**
 * @brief Container for renderable series
 */
@interface SCIRenderableSeriesCollection : NSObject

-(id)initWithSeriesCollection:(NSArray*)series Parent:(SCIChartSurface*)parent;
-(id)initWithParent:(SCIChartSurface*)parent;

@property (nonatomic, weak) SCIChartSurface* parent;

/**
 * Gets the quantity of series in collection
 */
-(int) count;

/** Gets series by index from the collection
 * @param index Index used when retreiving for renderqable series
 @see SCIRenderableSeriesProtocol
 */
-(id<SCIRenderableSeriesProtocol>)itemAt:(int)index;

/** Appends series to the collection
 * @param item Item to insert into collection
 @see SCIRenderableSeriesProtocol
 */
-(void)add:(id<SCIRenderableSeriesProtocol>)item;

/** Inserts series into the collection at specified position
 * @param item Item to insert into collection
 * @param index Position where series will be placed
 @see SCIRenderableSeriesProtocol
 */
-(void)insert:(id<SCIRenderableSeriesProtocol>)item At:(int)index;

/** Checks whether series collection contains the series or not
 * @param item Item to check in collection
 @see SCIRenderableSeriesProtocol
 */
-(BOOL)contains:(id<SCIRenderableSeriesProtocol>)item;

/** Removes series instance from  collection
 * @param item Item to be deleted from collection
 @see SCIRenderableSeriesProtocol
 */
-(void)remove:(id<SCIRenderableSeriesProtocol>)item;

/** Removes series instance from  collection
 * @param index Index of item, which will be deleted from collection
 @see SCIRenderableSeriesProtocol
 */
-(void)removeAt:(int)index;

/**Removes all series from collection*/
-(void)clear;

-(id<SCIRenderableSeriesProtocol>) firstObject;

@end
