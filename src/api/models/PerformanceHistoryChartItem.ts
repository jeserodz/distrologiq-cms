/* tslint:disable */
/* eslint-disable */
/**
 * Distrologiq
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PerformanceHistoryChartItem
 */
export interface PerformanceHistoryChartItem {
    /**
     * 
     * @type {string}
     * @memberof PerformanceHistoryChartItem
     */
    routeName: string;
    /**
     * 
     * @type {number}
     * @memberof PerformanceHistoryChartItem
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof PerformanceHistoryChartItem
     */
    completedDuration: number;
    /**
     * 
     * @type {number}
     * @memberof PerformanceHistoryChartItem
     */
    performance: number;
}

export function PerformanceHistoryChartItemFromJSON(json: any): PerformanceHistoryChartItem {
    return PerformanceHistoryChartItemFromJSONTyped(json, false);
}

export function PerformanceHistoryChartItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): PerformanceHistoryChartItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'routeName': json['routeName'],
        'duration': json['duration'],
        'completedDuration': json['completedDuration'],
        'performance': json['performance'],
    };
}

export function PerformanceHistoryChartItemToJSON(value?: PerformanceHistoryChartItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'routeName': value.routeName,
        'duration': value.duration,
        'completedDuration': value.completedDuration,
        'performance': value.performance,
    };
}


