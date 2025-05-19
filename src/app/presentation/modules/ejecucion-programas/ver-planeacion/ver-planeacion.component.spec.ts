import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlaneacionComponent } from './ver-planeacion.component';

describe('VerPlaneacionComponent', () => {
  let component: VerPlaneacionComponent;
  let fixture: ComponentFixture<VerPlaneacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPlaneacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPlaneacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
