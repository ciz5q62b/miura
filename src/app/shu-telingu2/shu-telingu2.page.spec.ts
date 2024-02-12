import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShuTelingu2Page } from './shu-telingu2.page';

describe('ShuTelingu2Page', () => {
  let component: ShuTelingu2Page;
  let fixture: ComponentFixture<ShuTelingu2Page>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ShuTelingu2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
