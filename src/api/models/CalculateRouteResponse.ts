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
import {
    RouteGeometry,
    RouteGeometryFromJSON,
    RouteGeometryFromJSONTyped,
    RouteGeometryToJSON,
    RouteStop,
    RouteStopFromJSON,
    RouteStopFromJSONTyped,
    RouteStopToJSON,
} from './';

/**
 * 
 * @export
 * @interface CalculateRouteResponse
 */
export interface CalculateRouteResponse {
    /**
     * 
     * @type {number}
     * @memberof CalculateRouteResponse
     */
    distance: number;
    /**
     * 
     * @type {number}
     * @memberof CalculateRouteResponse
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof CalculateRouteResponse
     */
    durationWithLoadTime: number;
    /**
     * 
     * @type {RouteGeometry}
     * @memberof CalculateRouteResponse
     */
    geometry: RouteGeometry;
    /**
     * 
     * @type {Array<RouteStop>}
     * @memberof CalculateRouteResponse
     */
    optimizedRouteStops: Array<RouteStop>;
}

export function CalculateRouteResponseFromJSON(json: any): CalculateRouteResponse {
    return CalculateRouteResponseFromJSONTyped(json, false);
}

export function CalculateRouteResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CalculateRouteResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'distance': json['distance'],
        'duration': json['duration'],
        'durationWithLoadTime': json['durationWithLoadTime'],
        'geometry': RouteGeometryFromJSON(json['geometry']),
        'optimizedRouteStops': ((json['optimizedRouteStops'] as Array<any>).map(RouteStopFromJSON)),
    };
}

export function CalculateRouteResponseToJSON(value?: CalculateRouteResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'distance': value.distance,
        'duration': value.duration,
        'durationWithLoadTime': value.durationWithLoadTime,
        'geometry': RouteGeometryToJSON(value.geometry),
        'optimizedRouteStops': ((value.optimizedRouteStops as Array<any>).map(RouteStopToJSON)),
    };
}


