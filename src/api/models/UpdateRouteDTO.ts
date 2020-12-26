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
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdateRouteDTO
 */
export interface UpdateRouteDTO {
    /**
     * 
     * @type {string}
     * @memberof UpdateRouteDTO
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateRouteDTO
     */
    distance: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateRouteDTO
     */
    avgLoadTime: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateRouteDTO
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateRouteDTO
     */
    durationWithLoadTime: number;
    /**
     * 
     * @type {Date}
     * @memberof UpdateRouteDTO
     */
    estimatedStartDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof UpdateRouteDTO
     */
    estimatedEndDate: Date;
    /**
     * 
     * @type {RouteGeometry}
     * @memberof UpdateRouteDTO
     */
    geometry: RouteGeometry;
    /**
     * 
     * @type {Array<RouteStop>}
     * @memberof UpdateRouteDTO
     */
    stops: Array<RouteStop>;
    /**
     * 
     * @type {User}
     * @memberof UpdateRouteDTO
     */
    driver: User;
    /**
     * 
     * @type {Date}
     * @memberof UpdateRouteDTO
     */
    started: Date;
    /**
     * 
     * @type {Date}
     * @memberof UpdateRouteDTO
     */
    completed: Date;
    /**
     * 
     * @type {number}
     * @memberof UpdateRouteDTO
     */
    completedDuration: number;
}

export function UpdateRouteDTOFromJSON(json: any): UpdateRouteDTO {
    return UpdateRouteDTOFromJSONTyped(json, false);
}

export function UpdateRouteDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateRouteDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'distance': json['distance'],
        'avgLoadTime': json['avgLoadTime'],
        'duration': json['duration'],
        'durationWithLoadTime': json['durationWithLoadTime'],
        'estimatedStartDate': (new Date(json['estimatedStartDate'])),
        'estimatedEndDate': (new Date(json['estimatedEndDate'])),
        'geometry': RouteGeometryFromJSON(json['geometry']),
        'stops': ((json['stops'] as Array<any>).map(RouteStopFromJSON)),
        'driver': UserFromJSON(json['driver']),
        'started': (new Date(json['started'])),
        'completed': (new Date(json['completed'])),
        'completedDuration': json['completedDuration'],
    };
}

export function UpdateRouteDTOToJSON(value?: UpdateRouteDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'distance': value.distance,
        'avgLoadTime': value.avgLoadTime,
        'duration': value.duration,
        'durationWithLoadTime': value.durationWithLoadTime,
        'estimatedStartDate': (value.estimatedStartDate.toISOString()),
        'estimatedEndDate': (value.estimatedEndDate.toISOString()),
        'geometry': RouteGeometryToJSON(value.geometry),
        'stops': ((value.stops as Array<any>).map(RouteStopToJSON)),
        'driver': UserToJSON(value.driver),
        'started': (value.started.toISOString()),
        'completed': (value.completed.toISOString()),
        'completedDuration': value.completedDuration,
    };
}


