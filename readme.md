# Rappelle-toi

This repository contains the souce code of the *Rappelle-toi* mobile app featured in the *[Applications mobiles avec Cordova et PhoneGap](http://www.eyrolles.com/Informatique/Livre/applications-mobiles-avec-cordova-et-phonegap-9782212140521)* book published by [@Eyrolles](https://twitter.com/eyrolles) and written by [@fingerproof](https://twitter.com/fingerproof) and [@siebmanb](https://twitter.com/siebmanb).

*Rappelle-toi* is a [Cordova](https://cordova.apache.org/)/[PhoneGap](http://phonegap.com/) application developped using Web technologies like HTML, CSS and JavaScript. It is intended to run on **iOS and Android**, preferably on the latest versions of both these mobile operating systems.

The app is **some kind of a diary** allowing the user to associate a year and a picture, a video clip, some text or a geolocation to make an entry which will then be displayed in a sorted timeline. Entries are saved locally and can be deleted if need be.

As it is intended to be **educational only**, *Rappelle-toi* is meant to remain relatively simple and its source files must be fully annotated. That said, everyone willing to contribute is very welcome to do so submitting one or more pull requests :)

## Running the app

*Applications mobiles avec Cordova et PhoneGap* shows you how to install and setup Cordova/PhoneGap then, to run the app, you must open a terminal window and:

1. `git clone` this repository
2. `cd` into the freshly created *rappelle-toi* directory
3. add the needed platforms using `cordova platform add` (e.g. `cordova platform add ios`)
4. execute `cordova plugin add dependencies` to get the required plugins
5. and finally run `cordova run` or `cordova emulate` depending on your preferred deployment target

If you want to contribute, note that the book also teaches you **how to debug** this kind of apps, plus you can use the [GapReload](https://github.com/fingerproof/cordova-plugin-gapreload) plugin to enjoy a faster development workflow.

## Screenshots

![An empty timeline](https://raw.githubusercontent.com/sebastien-p/rappelle-toi/master/screenshots/empty-timeline.png)
![The text view](https://raw.githubusercontent.com/sebastien-p/rappelle-toi/master/screenshots/text-view.png)
![The location view](https://raw.githubusercontent.com/sebastien-p/rappelle-toi/master/screenshots/location-view.png)
![An timeline showing two entries](https://raw.githubusercontent.com/sebastien-p/rappelle-toi/master/screenshots/timeline.png)
