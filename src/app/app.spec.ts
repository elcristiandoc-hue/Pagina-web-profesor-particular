import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero headline', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Matemáticas, Física y Química');
  });

  it('should keep the WhatsApp button pinned to the viewport', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const fab = fixture.nativeElement.querySelector('app-whatsapp-fab .fab') as HTMLElement;
    expect(fab).toBeTruthy();
    expect(getComputedStyle(fab).position).toBe('fixed');
  });
});
