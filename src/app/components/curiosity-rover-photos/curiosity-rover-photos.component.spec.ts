import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriosityRoverPhotosComponent } from './curiosity-rover-photos.component';

describe('CuriosityRoverPhotosComponent', () => {
  let component: CuriosityRoverPhotosComponent;
  let fixture: ComponentFixture<CuriosityRoverPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuriosityRoverPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuriosityRoverPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
