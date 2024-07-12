import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColaboradoresComponent } from './list-colaboradores.component';

describe('ListColaboradoresComponent', () => {
  let component: ListColaboradoresComponent;
  let fixture: ComponentFixture<ListColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListColaboradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
