import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetextComponent } from './livetext.component';

describe('LivetextComponent', () => {
  let component: LivetextComponent;
  let fixture: ComponentFixture<LivetextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivetextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
