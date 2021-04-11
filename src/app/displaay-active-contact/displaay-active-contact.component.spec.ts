import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaayActiveContactComponent } from './displaay-active-contact.component';


describe('DisplaayActiveContactComponent', () => {
  
  let component: DisplaayActiveContactComponent;
  let fixture: ComponentFixture<DisplaayActiveContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaayActiveContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaayActiveContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
