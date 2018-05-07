import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarpedidoComponent } from './finalizarpedido.component';

describe('FinalizarpedidoComponent', () => {
  let component: FinalizarpedidoComponent;
  let fixture: ComponentFixture<FinalizarpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
