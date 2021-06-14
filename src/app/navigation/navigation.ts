import { FuseNavigation } from '@fuse/types';
export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'menu.title',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'menu.dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard'
      },
      {
        id: 'board',
        title: 'Board',
        translate: 'menu.board',
        type: 'item',
        icon: 'assessment',
        url: '/board'
      },
      {
        id: 'chat',
        title: 'Chat',
        translate: 'menu.chat',
        type: 'item',
        icon: 'chat',
        url: '/chat'
      },
      {
        id: 'projects',
        title: 'Projects',
        translate: 'menu.projects',
        type: 'item',
        icon: 'menu',
        url: '/projects'
      },
      {
        id: 'profil',
        title: 'Profil',
        translate: 'menu.profil',
        type: 'item',
        icon: 'person',
        url: '/profile'
      }
    ]
  }
];
