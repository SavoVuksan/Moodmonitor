import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEntryListComponent } from './search-entry-list.component';

describe('SearchEntryListComponent', () => {
  let component: SearchEntryListComponent;
  let fixture: ComponentFixture<SearchEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
