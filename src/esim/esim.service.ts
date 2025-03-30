import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EsimDTO } from './dto/esim.dto';

@Injectable()
export class EsimService {
  private readonly apiUrl = process.env.ESIM_API_URL;
  private readonly authConfig: AxiosRequestConfig = {
    headers: {
      'RT-AccessCode': process.env.ESIM_API_ACCESS_CODE,
      'Content-Type': 'application/json',
    },
  };

  constructor(private readonly httpService: HttpService) {}

  private request<T>(endpoint: string, data?: any): Observable<T> {
    const config: AxiosRequestConfig = { ...this.authConfig };

    return this.httpService
      .post<T>(`${this.apiUrl}${endpoint}`, data, config)
      .pipe(map((res) => res.data));
  }

  getAllDataPackages(dto: EsimDTO): Observable<any> {
    return this.request('/open/package/list', dto);
  }

  orderEsim(planId: string, email: string): Observable<any> {
    return this.request('/orders', { plan_id: planId, email });
  }

  getOrderStatus(orderId: string): Observable<any> {
    return this.request(`/orders/${orderId}`);
  }
}
