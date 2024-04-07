import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ROUTES } from '../../shared-module/constants/routes-constant';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  @Input() isCollapsed!: boolean;
  

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}
  
  items: MenuItem[] = [
    // { label: 'Get Started', icon: 'pi pi-fw pi-box' },
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      routerLink: ROUTES.DASHBOARD,
      routerLinkActive: true,
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-car',
      expanded: false,
      items: [
        {
          label: 'Venue',
          routerLink: ROUTES.VENUE,
          routerLinkActive: true,
        },
        { label: 'Drivers', routerLink: '/drivers', routerLinkActive: true },
        { label: 'Contacts', routerLink: '/contacts', routerLinkActive: true },
        { label: 'Trips', routerLink: '/trips', routerLinkActive: true },
        {
          label: 'School Transport',
          items: [
            {
              label: 'Schools',
              routerLink: '/school-transport/schools',
              routerLinkActive: true,
            },
            {
              label: 'Reservations',
              routerLink: '/school-transport/reservation',
              routerLinkActive: true,
            },
            {
              label: 'Trips',
              routerLink: '/school-transport/trips',
              routerLinkActive: true,
            },
            {
              label: 'Trip Templates',
              routerLink: '/school-transport/trip-templates',
              routerLinkActive: true,
            },
          ],
        },
        {
          label: 'Corporate Transport',
          items: [
            {
              label: 'Corporates',
              routerLink: '/corporate-transport/corporates',
              routerLinkActive: true,
            },
            {
              label: 'Group Reservation',
              routerLink: '/corporate-transport/group-reservation',
              routerLinkActive: true,
            },
            {
              label: 'Reservations',
              routerLink: '/corporate-transport/reservations',
              routerLinkActive: true,
            },
            {
              label: 'Trips',
              routerLink: '/corporate-transport/trips',
              routerLinkActive: true,
            },
            {
              label: 'Trip Templates',
              routerLink: '/corporate-transport/trip-templates',
              routerLinkActive: true,
            },
          ],
        },
        {
          label: 'Cab Transport',
          items: [
            {
              label: 'Reservations',
              routerLink: '/cab-transport/reservation',
              routerLinkActive: true,
            },
            {
              label: 'Trips',
              routerLink: '/cab-transport/trips',
              routerLinkActive: true,
            },
          ],
        },
        {
          label: 'Bus Transport',
          items: [
            {
              label: 'Reservations',
              routerLink: '/bus-transport/reservation',
              routerLinkActive: true,
            },
            {
              label: 'Trips',
              routerLink: '/bus-transport/trips',
              routerLinkActive: true,
            },
          ],
        },
      ],
    },
    {
      label: 'Fleet',
      icon: 'pi pi-fw pi-truck',
      expanded: false,
      items: [
        { label: 'Vehicles', routerLink: '/vehicles', routerLinkActive: true },
        {
          label: 'Vehicle Types',
          routerLink: '/vehicle-types',
          routerLinkActive: true,
        },
      ],
    },
  ];
  ngOnInit(): void {}
}
