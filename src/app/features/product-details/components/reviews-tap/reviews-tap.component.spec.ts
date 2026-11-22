import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsTapComponent } from './reviews-tap.component';

describe('ReviewsTapComponent', () => {
  let component: ReviewsTapComponent;
  let fixture: ComponentFixture<ReviewsTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsTapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsTapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
