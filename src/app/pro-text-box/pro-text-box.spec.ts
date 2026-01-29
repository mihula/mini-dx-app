import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProTextBox } from './pro-text-box';

describe('ProTextBox', () => {
  let component: ProTextBox;
  let fixture: ComponentFixture<ProTextBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProTextBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProTextBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
