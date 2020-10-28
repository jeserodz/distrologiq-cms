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
 * @interface CalculateRouteDTO
 */
export interface CalculateRouteDTO {
    /**
     * 
     * @type {Array<object>}
     * @memberof CalculateRouteDTO
     */
    routeStops: Array<object>;
    /**
     * 
     * @type {Date}
     * @memberof CalculateRouteDTO
     */
    estimatedStartDate: Date;
    /**
     * 
     * @type {number}
     * @memberof CalculateRouteDTO
     */
    avgLoadTime: number;
}

export function CalculateRouteDTOFromJSON(json: any): CalculateRouteDTO {
    return CalculateRouteDTOFromJSONTyped(json, false);
}

export function CalculateRouteDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CalculateRouteDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'routeStops': json['routeStops'],
        'estimatedStartDate': (new Date(json['estimatedStartDate'])),
        'avgLoadTime': json['avgLoadTime'],
    };
}

export function CalculateRouteDTOToJSON(value?: CalculateRouteDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'routeStops': value.routeStops,
        'estimatedStartDate': (value.estimatedStartDate.toISOString()),
        'avgLoadTime': value.avgLoadTime,
    };
}


