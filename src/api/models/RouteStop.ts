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
    Destination,
    DestinationFromJSON,
    DestinationFromJSONTyped,
    DestinationToJSON,
    Route,
    RouteFromJSON,
    RouteFromJSONTyped,
    RouteToJSON,
} from './';

/**
 * 
 * @export
 * @interface RouteStop
 */
export interface RouteStop {
    /**
     * 
     * @type {number}
     * @memberof RouteStop
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof RouteStop
     */
    type: RouteStopTypeEnum;
    /**
     * 
     * @type {Destination}
     * @memberof RouteStop
     */
    destination: Destination;
    /**
     * 
     * @type {Route}
     * @memberof RouteStop
     */
    route: Route;
    /**
     * 
     * @type {number}
     * @memberof RouteStop
     */
    waypointIndex: number;
    /**
     * 
     * @type {Date}
     * @memberof RouteStop
     */
    started: Date;
    /**
     * 
     * @type {Date}
     * @memberof RouteStop
     */
    completed: Date;
}

export function RouteStopFromJSON(json: any): RouteStop {
    return RouteStopFromJSONTyped(json, false);
}

export function RouteStopFromJSONTyped(json: any, ignoreDiscriminator: boolean): RouteStop {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'type': json['type'],
        'destination': DestinationFromJSON(json['destination']),
        'route': RouteFromJSON(json['route']),
        'waypointIndex': json['waypointIndex'],
        'started': (new Date(json['started'])),
        'completed': (new Date(json['completed'])),
    };
}

export function RouteStopToJSON(value?: RouteStop | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'type': value.type,
        'destination': DestinationToJSON(value.destination),
        'route': RouteToJSON(value.route),
        'waypointIndex': value.waypointIndex,
        'started': (value.started.toISOString()),
        'completed': (value.completed.toISOString()),
    };
}

/**
* @export
* @enum {string}
*/
export enum RouteStopTypeEnum {
    DELIVERY = 'DELIVERY',
    PICKUP = 'PICKUP',
    DELIVERYPICKUP = 'DELIVERY_PICKUP',
    ARRIVAL = 'ARRIVAL'
}


