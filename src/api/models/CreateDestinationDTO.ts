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
 * @interface CreateDestinationDTO
 */
export interface CreateDestinationDTO {
    /**
     * 
     * @type {string}
     * @memberof CreateDestinationDTO
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDestinationDTO
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDestinationDTO
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDestinationDTO
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDestinationDTO
     */
    references?: string;
    /**
     * 
     * @type {number}
     * @memberof CreateDestinationDTO
     */
    longitude: number;
    /**
     * 
     * @type {number}
     * @memberof CreateDestinationDTO
     */
    latitude: number;
    /**
     * 
     * @type {boolean}
     * @memberof CreateDestinationDTO
     */
    isOwnCompany?: boolean;
}

export function CreateDestinationDTOFromJSON(json: any): CreateDestinationDTO {
    return CreateDestinationDTOFromJSONTyped(json, false);
}

export function CreateDestinationDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateDestinationDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'references': !exists(json, 'references') ? undefined : json['references'],
        'longitude': json['longitude'],
        'latitude': json['latitude'],
        'isOwnCompany': !exists(json, 'isOwnCompany') ? undefined : json['isOwnCompany'],
    };
}

export function CreateDestinationDTOToJSON(value?: CreateDestinationDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'phone': value.phone,
        'code': value.code,
        'references': value.references,
        'longitude': value.longitude,
        'latitude': value.latitude,
        'isOwnCompany': value.isOwnCompany,
    };
}


