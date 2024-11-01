import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyUsersPage } from './my-users.page';

describe('MyUsersPage', () => {
  let component: MyUsersPage;
  let fixture: ComponentFixture<MyUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
