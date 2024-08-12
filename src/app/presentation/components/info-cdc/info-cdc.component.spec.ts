import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCdcComponent } from './info-cdc.component';

describe('InfoCdcComponent', () => {
  let component: InfoCdcComponent;
  let fixture: ComponentFixture<InfoCdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCdcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
