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
 * @interface SetSettingsDTO
 */
export interface SetSettingsDTO {
    /**
     * 
     * @type {string}
     * @memberof SetSettingsDTO
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof SetSettingsDTO
     */
    avgLoadTime: number;
    /**
     * 
     * @type {number}
     * @memberof SetSettingsDTO
     */
    longitude: number;
    /**
     * 
     * @type {number}
     * @memberof SetSettingsDTO
     */
    latitude: number;
}

export function SetSettingsDTOFromJSON(json: any): SetSettingsDTO {
    return SetSettingsDTOFromJSONTyped(json, false);
}

export function SetSettingsDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SetSettingsDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'avgLoadTime': json['avgLoadTime'],
        'longitude': json['longitude'],
        'latitude': json['latitude'],
    };
}

export function SetSettingsDTOToJSON(value?: SetSettingsDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'avgLoadTime': value.avgLoadTime,
        'longitude': value.longitude,
        'latitude': value.latitude,
    };
}


