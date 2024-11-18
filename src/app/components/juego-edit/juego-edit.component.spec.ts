import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegoEditComponent } from './juego-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('JuegoEditComponent', () => {
  let component: JuegoEditComponent;
  let fixture: ComponentFixture<JuegoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoEditComponent, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    const form = component.juegoForm.value;
    expect(form.titulo).toBe('');
    expect(form.autor).toBe('');
    expect(form.anioPublicacion).toBe('');
    expect(form.genero).toBe('');
  });
});

