import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFMEditComponent } from './cfm-edit.component';

describe('CFMEditComponent', () => {
  let component: CFMEditComponent;
  let fixture: ComponentFixture<CFMEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFMEditComponent]
    });
    fixture = TestBed.createComponent(CFMEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
