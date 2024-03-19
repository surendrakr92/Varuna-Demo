import { SharedService } from "src/app/services/shared.service";

export function updateMenuItemFromUrl(redirectionApi: SharedService, url: string) {
    const menuItems:any = {
      'dashboard': '',
      'master': 'Master',
      'operation': 'Operation',
      'finance': 'Finance',
      'event-management': 'Event Management',
      'market': 'Market',
      'indent': 'Indent',
      'stationery': 'stationery',
      'ticket': 'ticket',
      'fleet': 'Fleet',
    };
    const menuItem = menuItems[url.split('/')[1]];
    redirectionApi.setMenuItem(menuItem);
  }
  
//   you can use below code to short code in fullpagelayouts
// router.events.subscribe(event => {
//     if (event instanceof NavigationEnd) {
//       updateMenuItemFromUrl(redirectionApi, event.url);
//     }
//   });