/**
 * This service implements functionality to make api calls through open api generated client
 * We are adding custom axios instance which helps customize the generated client with interceptors and more axios functionalities
 */
import { NetworkAPIApi } from 'swagger_tof_pack';
import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:3200',
  timeout: 30000,
};
// Create axios instance
const axiosInstance = axios.create(axiosConfig);

// Configuration and base path are not provided
// const apiService = new DesignsApi(undefined, undefined, axiosInstance);
const networkService = new NetworkAPIApi(undefined, '', axiosInstance);

export { networkService, axiosInstance };
