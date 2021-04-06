/**
 * This service implements functionality to make api calls through open api generated client
 * We are adding custom axios instance which helps customize the generated client with interceptors and more axios functionalities
 */
import { DesignsApi } from 'typescript-axios';
import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create();

// Configuration and base path are not provided
const apiService = new DesignsApi(undefined, undefined, axiosInstance);

export { apiService, axiosInstance };
