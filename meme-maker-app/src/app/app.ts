import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { SidenavMenuItem } from './models/sidenav-menu-item';
import { ChangeLanguage } from './components/change-language/change-language';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatListItem,
    MatListItemTitle,
    MatListItemIcon,
    MatNavList,
    RouterLink,
    ChangeLanguage,
    TranslocoPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('meme-maker-app');

  protected readonly menuItems: SidenavMenuItem[] = [
    {
      title: 'memeTemplates',
      icon: 'dashboard',
      route: '/meme-templates',
    },
    {
      title: 'memeTemplateEditor',
      icon: 'edit',
      route: '/meme-template-editor',
    }
  ];
}
