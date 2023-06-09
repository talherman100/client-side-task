import { Fetch } from '../components/Fetch';
import { BaseConfig } from '../config/AppConfig';

export const RequestOptions = {
  get: () => ({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }),
  post: data => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
};

export const FactoryService = {
  Update: data => Fetch(`${BaseConfig.apiUrl}/Photo/Update`, RequestOptions.post(data)),
  CloseAll: () => Fetch(`${BaseConfig.apiUrl}/Photo/CloseAllSockets`, RequestOptions.get()),
  AddAlbum: data => Fetch(`${BaseConfig.apiUrl}/Photo/AddAlbum`, RequestOptions.post(data)),
};
