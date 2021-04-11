import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsviewComponent } from './contactsview.component';

describe('ContactsviewComponent', () => {
  let component: ContactsviewComponent;
  let fixture: ComponentFixture<ContactsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
