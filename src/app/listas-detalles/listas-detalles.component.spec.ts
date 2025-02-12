import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasDetallesComponent } from './listas-detalles.component';

describe('ListasDetallesComponent', () => {
  let component: ListasDetallesComponent;
  let fixture: ComponentFixture<ListasDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
