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
 * @interface UserRoles
 */
export interface UserRoles {
    /**
     * 
     * @type {boolean}
     * @memberof UserRoles
     */
    admin: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserRoles
     */
    driver: boolean;
}

export function UserRolesFromJSON(json: any): UserRoles {
    return UserRolesFromJSONTyped(json, false);
}

export function UserRolesFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRoles {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'admin': json['admin'],
        'driver': json['driver'],
    };
}

export function UserRolesToJSON(value?: UserRoles | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'admin': value.admin,
        'driver': value.driver,
    };
}


