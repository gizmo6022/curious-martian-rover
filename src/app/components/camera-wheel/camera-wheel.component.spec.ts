import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraWheelComponent } from './camera-wheel.component';

describe('CameraWheelComponent', () => {
  let component: CameraWheelComponent;
  let fixture: ComponentFixture<CameraWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraWheelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CameraWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
