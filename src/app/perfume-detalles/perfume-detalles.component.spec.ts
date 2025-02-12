import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeDetallesComponent } from './perfume-detalles.component';

describe('PerfumeDetallesComponent', () => {
  let component: PerfumeDetallesComponent;
  let fixture: ComponentFixture<PerfumeDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumeDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumeDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
