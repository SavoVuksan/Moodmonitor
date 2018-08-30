import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoodComponent } from './read-mood.component';

describe('ReadMoodComponent', () => {
  let component: ReadMoodComponent;
  let fixture: ComponentFixture<ReadMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
