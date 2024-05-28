import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSelectionContainerComponent } from './photo-selection-container.component';

describe('PhotoSelectionContainerComponent', () => {
  let component: PhotoSelectionContainerComponent;
  let fixture: ComponentFixture<PhotoSelectionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSelectionContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoSelectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
