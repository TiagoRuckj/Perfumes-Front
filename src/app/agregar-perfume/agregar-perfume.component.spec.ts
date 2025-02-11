import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPerfumeComponent } from './agregar-perfume.component';

describe('AgregarPerfumeComponent', () => {
  let component: AgregarPerfumeComponent;
  let fixture: ComponentFixture<AgregarPerfumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPerfumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPerfumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
