import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralComponent } from './genral.component';

describe('GenralComponent', () => {
  let component: GenralComponent;
  let fixture: ComponentFixture<GenralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checked toBe and toEqual', () => {
    var a = 'Hello';
    var b = 'Hello';

    const c = ['a', 'b', 'c'];
    const d = ['a', 'b', 'c'];

    expect(a).toBe(b);
    expect(a).toEqual(b);
  });

  it('Check toBeGreaterThan and toBeGreaterThanOrEqual', () => {
    const a = 10;
    expect(a).toBeGreaterThan(5);

    const b = 9
    expect(b).toBeGreaterThanOrEqual(9);
  });

  it('should match a string with a regular expression', () => {
    const testString = 'Hello World';
    expect(testString).toMatch(/Hello/);
  });

});
