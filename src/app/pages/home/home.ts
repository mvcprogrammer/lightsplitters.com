import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponsiveImage } from '@shared/responsive-image/responsive-image';
import { SectionHeading } from '@shared/section-heading/section-heading';
import { ServicesSection } from '@shared/services-section/services-section';
import { GalleryGrid } from '@shared/gallery-grid/gallery-grid';
import { ContactForm } from '@shared/contact-form/contact-form';
import { PrintSteps } from '../prints/print-steps';
import { BUSINESS, SERVICES } from '../../content/site-content';
import { PHOTOS, PORTFOLIO } from '../../content/photos';

@Component({
  selector: 'ls-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ResponsiveImage, SectionHeading, ServicesSection, GalleryGrid, ContactForm, PrintSteps],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly biz = BUSINESS;
  protected readonly services = SERVICES;
  protected readonly portfolio = PORTFOLIO;
  protected readonly photos = PHOTOS;
}
