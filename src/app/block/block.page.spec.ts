import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockPage } from './block.page';

describe('BlockPage', () => {
  let component: BlockPage;
  let fixture: ComponentFixture<BlockPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BlockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
