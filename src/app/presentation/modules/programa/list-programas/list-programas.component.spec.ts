import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgramasComponent } from './list-programas.component';

describe('ListProgramasComponent', () => {
  let component: ListProgramasComponent;
  let fixture: ComponentFixture<ListProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProgramasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
