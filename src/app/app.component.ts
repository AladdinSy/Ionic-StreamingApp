import { Component, Optional, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  alertPresented = false;

  constructor(
    private platform: Platform,
    public alertController: AlertController
  ) {
    this.backButtonEvent();
    //
    //
    // App.addListener('backButton', ({ canGoBack }) => {
    //   if (!canGoBack) {
    //     App.exitApp();
    //   }
    // });
  }

  async backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack() && !this.alertPresented) {
        this.alertPresented = true;
        this.backButtonAlert();
      }
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Stay',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
            this.alertPresented = false;
          },
        },
        {
          text: 'Exit',
          handler: () => {
            this.alertPresented = false;
            App.exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
}
