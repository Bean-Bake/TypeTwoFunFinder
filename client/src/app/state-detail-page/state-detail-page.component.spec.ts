import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDetailPageComponent } from './state-detail-page.component';

describe('StateDetailPageComponent', () => {
  let component: StateDetailPageComponent;
  let fixture: ComponentFixture<StateDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
