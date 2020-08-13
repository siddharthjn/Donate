import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAlertComponent } from './item-alert.component';

describe('ItemAlertComponent', () => {
  let component: ItemAlertComponent;
  let fixture: ComponentFixture<ItemAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
