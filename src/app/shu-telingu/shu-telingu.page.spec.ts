import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShuTelinguPage } from './shu-telingu.page';

describe('ShuTelinguPage', () => {
  let component: ShuTelinguPage;
  let fixture: ComponentFixture<ShuTelinguPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShuTelinguPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
