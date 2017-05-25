# SciChart.NativeScript.Examples
NativeScript Examples for SciChart.iOS and SciChart.Android High Performance Realtime Charting Library

# To get demo working
- Install nativescript stuff (see nativescript.org for details on what you need per platform)
- git clone repo
- cd demo
- tns platform add ios@~2.5.0
- tns plugin add ..
- tns build ios
^^^ This will pull down the cocoapod file and build it (metadata generated will be partial).
- cd  platforms/ios/Pods/SciChart/SchiChart.framework/Headers
- Edit the "SCIGenericType.h" file; and find the SCIGenericType structure and change it to be:

```
// For NativeScript we are defining a 64 bytes worth of data in place of the union,
// I believe the union's max size should be 64 bytes, based on all the types that are in it.
// This way the NativeScript data size information is consistent with what the SciChart framework expects 
// and so any function that set or consume the SCIGenericType will continue to work properly.
typedef struct {
   SCIDataType type;
   long long dummy;   // This is not really used by ANYTHING in NS, just to allocate space.
} SCIGenericType;
```


- Save and go back to the main /demo folder.
- tns build ios
^^^ This will build the app again, but use the new header  (metadata generated will be correct now).
- tns run ios

At this point the app should be running on your simulator or a phone (if connected).  If you look at the output you should see the GL error.