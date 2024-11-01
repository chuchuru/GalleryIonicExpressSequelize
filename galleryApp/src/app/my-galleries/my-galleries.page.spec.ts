import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyGalleriesPage } from './my-galleries.page';

describe('MyGalleriesPage', () => {
  let component: MyGalleriesPage;
  let fixture: ComponentFixture<MyGalleriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGalleriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
