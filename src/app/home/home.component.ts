import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products = []

  constructor(private apiService: ApiService) { }

  // private destroy$ = interval(3000)

  ngOnInit() {
    this.apiService.sendGetRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  destroy$: Subject<boolean> = new Subject<boolean>();


  public firstPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
  }

  public previousPage() {
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        })
    }
  }

  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        })
    }
  }

  public lastPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
  }

}
