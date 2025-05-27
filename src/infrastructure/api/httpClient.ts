import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// TODO: Implementate interceptor for JWT on headers if exists


