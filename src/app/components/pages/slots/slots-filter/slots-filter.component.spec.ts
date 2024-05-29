import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsFilterComponent } from './slots-filter.component';

describe('SlotsFilterComponent', () => {
  let component: SlotsFilterComponent;
  let fixture: ComponentFixture<SlotsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
