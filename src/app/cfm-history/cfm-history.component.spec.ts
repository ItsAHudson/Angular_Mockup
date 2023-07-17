import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFMHistoryComponent } from './cfm-history.component';

describe('CFMHistoryComponent', () => {
  let component: CFMHistoryComponent;
  let fixture: ComponentFixture<CFMHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFMHistoryComponent]
    });
    fixture = TestBed.createComponent(CFMHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
