# vietlottlucky

## Create new RN project
  - npx react-native init AwesomeProject --version X.XX.X
  - npx react-native init AwesomeTSProject --template react-native-template-typescript

## Change android package name
  - change folder inside java folder
  - adjust MainActivity.java
  - adjust MainApplication.java
  - adjust AndroidManifest.xml: package value
  - adjust app/build.gradle: applicationId value
  - adjust app/BUCK: android_build_config.package android_resource.package
  - in android folder: ./gradlew clean

## Change ios bundle identifier setup
  - 

## apply vector-icons
  - https://github.com/oblador/react-native-vector-icons

## Fix bug 'Cannot fit requested classes in a single dex file'
  - adjust build.gradle, app/build.gradle: set minSdkVersionto 21

## Init firebase android app
  - folow guide of firebase

## Run the project
  - npx react-native start
  - npx react-native run-android
