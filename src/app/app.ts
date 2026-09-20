import { afterNextRender, ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Hero } from './components/hero/hero';
import { Method } from './components/method/method';
import { Pricing } from './components/pricing/pricing';
import { Reviews } from './components/reviews/reviews';
import { SiteFooter } from './components/site-footer/site-footer';
import { SiteHeader } from './components/site-header/site-header';
import { Subjects } from './components/subjects/subjects';
import { WhatsappFab } from './components/whatsapp-fab/whatsapp-fab';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeader,
    Hero,
    Subjects,
    Method,
    About,
    Reviews,
    Pricing,
    Contact,
    SiteFooter,
    WhatsappFab,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    // Sin router, el navegador intenta saltar al ancla antes de que Angular pinte la página.
    afterNextRender(() => {
      const id = location.hash.slice(1);
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
      }
    });
  }
}
