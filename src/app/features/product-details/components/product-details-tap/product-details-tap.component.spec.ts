import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsTapComponent } from './product-details-tap.component';

describe('ProductDetailsTapComponent', () => {
  let component: ProductDetailsTapComponent;
  let fixture: ComponentFixture<ProductDetailsTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsTapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsTapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
