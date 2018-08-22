import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedataComponent } from './placedata.component';

describe('PlacedataComponent', () => {
  let component: PlacedataComponent;
  let fixture: ComponentFixture<PlacedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
