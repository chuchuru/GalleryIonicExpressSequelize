import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyArtistsPage } from './my-artists.page';

describe('MyArtistsPage', () => {
  let component: MyArtistsPage;
  let fixture: ComponentFixture<MyArtistsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArtistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
