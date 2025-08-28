import {
    ProducerRegisterRequest,
    CustomerLoginRequest,
    CustomerRegisterRequest,
    SendEmailRequest,
    ProducerLoginRequest,
    CustomerUpdateRequest,
    CustomerInitRequest,
    ProducerInitRequest,
    CourierInitRequest,
    CourierRegisterRequest,
    CourierLoginRequest,
 } from "../types/requests/UserRequests";
 import {
    CustomerResponse,
    TokenResponse,
    AccountResponse,
 } from "../types/responses/UserResponses";
 import { ApiClient } from "@/lib/apiClient";
 import { ApiResponse } from "@/types/ApiResponse";
 
 // export const sendEmailCodeApi = async (payload: SendEmailRequest): Promise<ApiResponse<null>> => {
 //     return await ApiClient.post<SendEmailRequest, ApiResponse<null>>("/api/account/email", payload);
 //   };
 
 export const getAccountApi = async (token?: string): Promise<
    ApiResponse<AccountResponse>
 > => {
    return await ApiClient.get<ApiResponse<AccountResponse>>(
       "/api/account/account", token
    );
 };
 
 export const loginCustomerApi = async (
    payload: CustomerLoginRequest
 ): Promise<ApiResponse<TokenResponse>> => {
    return await ApiClient.post<
       CustomerLoginRequest,
       ApiResponse<TokenResponse>
    >("/api/customer/login", payload);
 };
 
 export const initCustomerApi = async (
    payload: CustomerInitRequest
 ): Promise<ApiResponse<null>> => {
    return await ApiClient.post<SendEmailRequest, ApiResponse<null>>(
       "/api/customer/init",
       payload
    );
 };
 
 export const registerCustomerApi = async (
    payload: CustomerRegisterRequest
 ): Promise<ApiResponse<TokenResponse>> => {
    return await ApiClient.post<
       CustomerRegisterRequest,
       ApiResponse<TokenResponse>
    >("/api/customer/register", payload);
 };
 
 export const loginProducerApi = async (
    payload: ProducerLoginRequest
 ): Promise<ApiResponse<TokenResponse>> => {
    return await ApiClient.post<
       ProducerLoginRequest,
       ApiResponse<TokenResponse>
    >("/api/producer/login", payload);
 };
 
 export const initProducerApi = async (
    payload: ProducerInitRequest
 ): Promise<ApiResponse<null>> => {
    return await ApiClient.post<SendEmailRequest, ApiResponse<null>>(
       "/api/producer/init",
       payload
    );
 };
 
 export const registerProducerApi = async (
    payload: ProducerRegisterRequest
 ): Promise<ApiResponse<TokenResponse>> => {
    return await ApiClient.post<
       ProducerRegisterRequest,
       ApiResponse<TokenResponse>
    >("/api/producer/register", payload);
 };
 
 export const updateCustomerApi = async (
    payload: CustomerUpdateRequest,
    token?: string
 ): Promise<ApiResponse<CustomerResponse>> => {
    return await ApiClient.patch<
       CustomerUpdateRequest,
       ApiResponse<CustomerResponse>
    >("/api/customer/update", payload, token);
 };
 
 export const loginCourierApi = async (
    payload: CourierLoginRequest
 ): Promise<ApiResponse<TokenResponse>> => {
    return await ApiClient.post<
       CourierLoginRequest,
       ApiResponse<TokenResponse>
    >("/api/courier/login", payload);
 };
 
 
 export const initCourierApi = async (
    payload: CourierInitRequest
 ): Promise<ApiResponse<null>> => {
    return await ApiClient.post<SendEmailRequest, ApiResponse<null>>(
       "/api/courier/init",
       payload
    );
 };
 
 export const registerCourierApi = async (
    payload: CourierRegisterRequest
 ): Promise<ApiResponse<TokenResponse>> => {
    return await ApiClient.post<
       CourierRegisterRequest,
       ApiResponse<TokenResponse>
    >("/api/courier/register", payload);
 };
 
 
 
 