import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Block2Page } from './block2.page';

describe('Block2Page', () => {
  let component: Block2Page;
  let fixture: ComponentFixture<Block2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Block2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
