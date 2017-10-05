import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncMultimediaComponent } from './sync-multimedia.component';

describe('SyncMultimediaComponent', () => {
  let component: SyncMultimediaComponent;
  let fixture: ComponentFixture<SyncMultimediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncMultimediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
