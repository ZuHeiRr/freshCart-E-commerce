import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReturnsTapComponent } from './shipping-returns-tap.component';

describe('ShippingReturnsTapComponent', () => {
  let component: ShippingReturnsTapComponent;
  let fixture: ComponentFixture<ShippingReturnsTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingReturnsTapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingReturnsTapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
