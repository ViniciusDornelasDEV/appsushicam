import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelidadeComponent } from './fidelidade.component';

describe('FidelidadeComponent', () => {
  let component: FidelidadeComponent;
  let fixture: ComponentFixture<FidelidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FidelidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
