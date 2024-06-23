import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProgramaByIdComponent } from './find-programa-by-id.component';

describe('FindProgramaByIdComponent', () => {
  let component: FindProgramaByIdComponent;
  let fixture: ComponentFixture<FindProgramaByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindProgramaByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindProgramaByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
