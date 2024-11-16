import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoListComponent } from './juego-list.component';

describe('JuegoListComponent', () => {
  let component: JuegoListComponent;
  let fixture: ComponentFixture<JuegoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
