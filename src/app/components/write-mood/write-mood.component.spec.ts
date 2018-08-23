import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteMoodComponent } from './write-mood.component';

describe('WriteMoodComponent', () => {
  let component: WriteMoodComponent;
  let fixture: ComponentFixture<WriteMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
