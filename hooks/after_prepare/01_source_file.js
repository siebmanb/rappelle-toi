#!/usr/bin/env node

var shell = require( "shelljs" );

shell.exec( "cp -R ./www/res/screen/ios/* platforms/ios/Rappelle-toi/Resources/splash" );
shell.exec( "cp -R ./www/res/icon/ios/* platforms/ios/Rappelle-toi/Resources/icons" );
shell.exec( "cp ./www/res/icon/android/icon-96-xhdpi.png platforms/android/res/drawable/icon.png" );
shell.exec( "cp ./www/res/icon/android/icon-72-hdpi.png platforms/android/res/drawable-hdpi/icon.png" );
shell.exec( "cp ./www/res/icon/android/icon-36-ldpi.png platforms/android/res/drawable-ldpi/icon.png" );
shell.exec( "cp ./www/res/icon/android/icon-48-mdpi.png platforms/android/res/drawable-mdpi/icon.png" );
shell.exec( "cp ./www/res/icon/android/icon-96-xhdpi.png platforms/android/res/drawable-xhdpi/icon.png" );

shell.exec( "cp ./www/res/screen/android/screen-xhdpi-portrait.png platforms/android/res/drawable/splash.png" );
shell.exec( "cp ./www/res/screen/android/screen-hdpi-portrait.png platforms/android/res/drawable-hdpi/splash.png" );
shell.exec( "cp ./www/res/screen/android/screen-ldpi-portrait.png platforms/android/res/drawable-ldpi/splash.png" );
shell.exec( "cp ./www/res/screen/android/screen-mdpi-portrait.png platforms/android/res/drawable-mdpi/splash.png" );
shell.exec( "cp ./www/res/screen/android/screen-xhdpi-portrait.png platforms/android/res/drawable-xhdpi/splash.png" );

shell.exec( "rm -r platforms/ios/www/res" );
shell.exec( "rm -r platforms/android/assets/www/res" );