import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalyPhotoComponent } from './dispaly-photo.component';

describe('DispalyPhotoComponent', () => {
  let component: DispalyPhotoComponent;
  let fixture: ComponentFixture<DispalyPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispalyPhotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispalyPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
