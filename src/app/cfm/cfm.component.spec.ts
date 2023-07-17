import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfmComponent } from './cfm.component';

describe('CfmComponent', () => {
  let component: CfmComponent;
  let fixture: ComponentFixture<CfmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CfmComponent]
    });
    fixture = TestBed.createComponent(CfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
