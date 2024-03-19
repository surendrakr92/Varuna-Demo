import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingServicceService } from 'src/app/services/loading-servicce.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loadingSubscription!: Subscription;

  constructor(
    private loadingScreenService: LoadingServicceService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef

  ) { }
  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loading$.pipe().subscribe((status: boolean) => {
      this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
      this._changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
