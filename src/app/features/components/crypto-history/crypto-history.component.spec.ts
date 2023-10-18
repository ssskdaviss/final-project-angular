import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoHistoryComponent } from './crypto-history.component';

describe('CryptoHistoryComponent', () => {
  let component: CryptoHistoryComponent;
  let fixture: ComponentFixture<CryptoHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CryptoHistoryComponent]
    });
    fixture = TestBed.createComponent(CryptoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
