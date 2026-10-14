import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SITE } from './site-config';

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

  it('should say what is offered in the only h1 and keep the tagline visible', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain('Clases particulares online');
    expect(compiled.querySelector('.hero__title')?.textContent).toContain('Explicaciones simples');
  });

  it('should give the hero photo explicit dimensions so it does not shift the layout', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const photo = fixture.nativeElement.querySelector('.hero__photo') as HTMLImageElement;
    expect(photo.getAttribute('width')).toBe('1000');
    expect(photo.getAttribute('height')).toBe('1000');
    expect(photo.getAttribute('srcset')).toContain('480w');
  });

  it('should render every FAQ entry', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const items = fixture.nativeElement.querySelectorAll('#preguntas details');
    expect(items.length).toBe(SITE.faq.length);
  });

  it('should quote in the FAQ the same prices as the pricing plans', () => {
    const priceAnswer = SITE.faq.find((item) => item.question.includes('Cuánto cuesta'));
    expect(priceAnswer).toBeTruthy();
    for (const plan of SITE.pricing.plans) {
      expect(priceAnswer!.answer).toContain(plan.price);
    }
  });

  it('should keep the WhatsApp button pinned to the viewport', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const fab = fixture.nativeElement.querySelector('app-whatsapp-fab .fab') as HTMLElement;
    expect(fab).toBeTruthy();
    expect(getComputedStyle(fab).position).toBe('fixed');
  });
});
