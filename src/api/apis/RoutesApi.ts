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


import * as runtime from '../runtime';
import {
    CompleteRouteStopDTO,
    CompleteRouteStopDTOFromJSON,
    CompleteRouteStopDTOToJSON,
    CreateRouteDTO,
    CreateRouteDTOFromJSON,
    CreateRouteDTOToJSON,
    Route,
    RouteFromJSON,
    RouteToJSON,
    RouteStop,
    RouteStopFromJSON,
    RouteStopToJSON,
    StartRouteStopDTO,
    StartRouteStopDTOFromJSON,
    StartRouteStopDTOToJSON,
    UpdateRouteDTO,
    UpdateRouteDTOFromJSON,
    UpdateRouteDTOToJSON,
} from '../models';

export interface CompleteRouteStopRequest {
    id: number;
    completeRouteStopDTO: CompleteRouteStopDTO;
}

export interface CreateRouteRequest {
    createRouteDTO: CreateRouteDTO;
}

export interface GetRouteRequest {
    id: number;
}

export interface GetRouteStopsRequest {
    id: number;
}

export interface GetRoutesAssignedToUserRequest {
    userId: number;
}

export interface RemoveRouteRequest {
    id: number;
}

export interface StartRouteStopRequest {
    id: number;
    startRouteStopDTO: StartRouteStopDTO;
}

export interface UpdateRouteRequest {
    id: number;
    updateRouteDTO: UpdateRouteDTO;
}

/**
 * 
 */
export class RoutesApi extends runtime.BaseAPI {

    /**
     */
    async completeRouteStopRaw(requestParameters: CompleteRouteStopRequest): Promise<runtime.ApiResponse<RouteStop>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling completeRouteStop.');
        }

        if (requestParameters.completeRouteStopDTO === null || requestParameters.completeRouteStopDTO === undefined) {
            throw new runtime.RequiredError('completeRouteStopDTO','Required parameter requestParameters.completeRouteStopDTO was null or undefined when calling completeRouteStop.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/stops/{id}/complete`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CompleteRouteStopDTOToJSON(requestParameters.completeRouteStopDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RouteStopFromJSON(jsonValue));
    }

    /**
     */
    async completeRouteStop(id: number, completeRouteStopDTO: CompleteRouteStopDTO): Promise<RouteStop> {
        const response = await this.completeRouteStopRaw({ id: id, completeRouteStopDTO: completeRouteStopDTO });
        return await response.value();
    }

    /**
     */
    async createRouteRaw(requestParameters: CreateRouteRequest): Promise<runtime.ApiResponse<Route>> {
        if (requestParameters.createRouteDTO === null || requestParameters.createRouteDTO === undefined) {
            throw new runtime.RequiredError('createRouteDTO','Required parameter requestParameters.createRouteDTO was null or undefined when calling createRoute.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateRouteDTOToJSON(requestParameters.createRouteDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RouteFromJSON(jsonValue));
    }

    /**
     */
    async createRoute(createRouteDTO: CreateRouteDTO): Promise<Route> {
        const response = await this.createRouteRaw({ createRouteDTO: createRouteDTO });
        return await response.value();
    }

    /**
     */
    async getRouteRaw(requestParameters: GetRouteRequest): Promise<runtime.ApiResponse<Route>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getRoute.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RouteFromJSON(jsonValue));
    }

    /**
     */
    async getRoute(id: number): Promise<Route> {
        const response = await this.getRouteRaw({ id: id });
        return await response.value();
    }

    /**
     */
    async getRouteStopsRaw(requestParameters: GetRouteStopsRequest): Promise<runtime.ApiResponse<RouteStop>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getRouteStops.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/stops/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RouteStopFromJSON(jsonValue));
    }

    /**
     */
    async getRouteStops(id: number): Promise<RouteStop> {
        const response = await this.getRouteStopsRaw({ id: id });
        return await response.value();
    }

    /**
     */
    async getRoutesRaw(): Promise<runtime.ApiResponse<Array<Route>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RouteFromJSON));
    }

    /**
     */
    async getRoutes(): Promise<Array<Route>> {
        const response = await this.getRoutesRaw();
        return await response.value();
    }

    /**
     */
    async getRoutesAssignedToUserRaw(requestParameters: GetRoutesAssignedToUserRequest): Promise<runtime.ApiResponse<Array<Route>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getRoutesAssignedToUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/assigned_to_user/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RouteFromJSON));
    }

    /**
     */
    async getRoutesAssignedToUser(userId: number): Promise<Array<Route>> {
        const response = await this.getRoutesAssignedToUserRaw({ userId: userId });
        return await response.value();
    }

    /**
     */
    async removeRouteRaw(requestParameters: RemoveRouteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling removeRoute.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeRoute(id: number): Promise<void> {
        await this.removeRouteRaw({ id: id });
    }

    /**
     */
    async startRouteStopRaw(requestParameters: StartRouteStopRequest): Promise<runtime.ApiResponse<RouteStop>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling startRouteStop.');
        }

        if (requestParameters.startRouteStopDTO === null || requestParameters.startRouteStopDTO === undefined) {
            throw new runtime.RequiredError('startRouteStopDTO','Required parameter requestParameters.startRouteStopDTO was null or undefined when calling startRouteStop.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/stops/{id}/start`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: StartRouteStopDTOToJSON(requestParameters.startRouteStopDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RouteStopFromJSON(jsonValue));
    }

    /**
     */
    async startRouteStop(id: number, startRouteStopDTO: StartRouteStopDTO): Promise<RouteStop> {
        const response = await this.startRouteStopRaw({ id: id, startRouteStopDTO: startRouteStopDTO });
        return await response.value();
    }

    /**
     */
    async updateRouteRaw(requestParameters: UpdateRouteRequest): Promise<runtime.ApiResponse<Route>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateRoute.');
        }

        if (requestParameters.updateRouteDTO === null || requestParameters.updateRouteDTO === undefined) {
            throw new runtime.RequiredError('updateRouteDTO','Required parameter requestParameters.updateRouteDTO was null or undefined when calling updateRoute.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/routes/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateRouteDTOToJSON(requestParameters.updateRouteDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RouteFromJSON(jsonValue));
    }

    /**
     */
    async updateRoute(id: number, updateRouteDTO: UpdateRouteDTO): Promise<Route> {
        const response = await this.updateRouteRaw({ id: id, updateRouteDTO: updateRouteDTO });
        return await response.value();
    }

}
