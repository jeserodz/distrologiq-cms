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
 * @interface Route
 */
export interface Route {
    /**
     * 
     * @type {number}
     * @memberof Route
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Route
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof Route
     */
    avgLoadTime: number;
    /**
     * 
     * @type {number}
     * @memberof Route
     */
    distance: number;
    /**
     * 
     * @type {number}
     * @memberof Route
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof Route
     */
    durationWithLoadTime: number;
    /**
     * 
     * @type {Date}
     * @memberof Route
     */
    estimatedStartDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof Route
     */
    estimatedEndDate: Date;
    /**
     * 
     * @type {RouteGeometry}
     * @memberof Route
     */
    geometry: RouteGeometry;
    /**
     * 
     * @type {Date}
     * @memberof Route
     */
    started: Date;
    /**
     * 
     * @type {Date}
     * @memberof Route
     */
    completed: Date;
    /**
     * 
     * @type {number}
     * @memberof Route
     */
    completedDuration: number;
    /**
     * 
     * @type {Array<RouteStop>}
     * @memberof Route
     */
    stops: Array<RouteStop>;
    /**
     * 
     * @type {User}
     * @memberof Route
     */
    driver: User;
    /**
     * 
     * @type {Date}
     * @memberof Route
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Route
     */
    updatedAt: Date;
}

export function RouteFromJSON(json: any): Route {
    return RouteFromJSONTyped(json, false);
}

export function RouteFromJSONTyped(json: any, ignoreDiscriminator: boolean): Route {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'avgLoadTime': json['avgLoadTime'],
        'distance': json['distance'],
        'duration': json['duration'],
        'durationWithLoadTime': json['durationWithLoadTime'],
        'estimatedStartDate': (new Date(json['estimatedStartDate'])),
        'estimatedEndDate': (new Date(json['estimatedEndDate'])),
        'geometry': RouteGeometryFromJSON(json['geometry']),
        'started': (new Date(json['started'])),
        'completed': (new Date(json['completed'])),
        'completedDuration': json['completedDuration'],
        'stops': ((json['stops'] as Array<any>).map(RouteStopFromJSON)),
        'driver': UserFromJSON(json['driver']),
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function RouteToJSON(value?: Route | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'avgLoadTime': value.avgLoadTime,
        'distance': value.distance,
        'duration': value.duration,
        'durationWithLoadTime': value.durationWithLoadTime,
        'estimatedStartDate': (value.estimatedStartDate.toISOString()),
        'estimatedEndDate': (value.estimatedEndDate.toISOString()),
        'geometry': RouteGeometryToJSON(value.geometry),
        'started': (value.started.toISOString()),
        'completed': (value.completed.toISOString()),
        'completedDuration': value.completedDuration,
        'stops': ((value.stops as Array<any>).map(RouteStopToJSON)),
        'driver': UserToJSON(value.driver),
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
    };
}


