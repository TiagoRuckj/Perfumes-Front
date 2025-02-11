import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeListaComponent } from './perfume-lista.component';

describe('PerfumeListaComponent', () => {
  let component: PerfumeListaComponent;
  let fixture: ComponentFixture<PerfumeListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumeListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
