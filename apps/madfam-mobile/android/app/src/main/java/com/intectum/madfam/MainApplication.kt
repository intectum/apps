package com.intectum.madfam

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader
import com.google.firebase.FirebaseApp
import com.google.firebase.appcheck.FirebaseAppCheck
import com.google.firebase.appcheck.playintegrity.PlayIntegrityAppCheckProviderFactory
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreSettings
import com.google.firebase.firestore.MemoryCacheSettings
import com.google.firebase.functions.FirebaseFunctions

class MainApplication : Application(), ReactApplication
{
  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this)
    {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          add(MadFamPackage())
        }

      override fun getJSMainModuleName(): String = "index"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate()
  {
    super.onCreate()
    SoLoader.init(this, false)

    FirebaseApp.initializeApp(this)
    FirebaseAppCheck
      .getInstance()
      .installAppCheckProviderFactory(PlayIntegrityAppCheckProviderFactory.getInstance())

    val firebaseEmulatorHost = getString(R.string.firebase_emulator_host)
    if (firebaseEmulatorHost.isNotEmpty()) {
      FirebaseAuth.getInstance().useEmulator(firebaseEmulatorHost, 9099)
      FirebaseFirestore.getInstance().useEmulator(firebaseEmulatorHost, 8080)
      FirebaseFunctions.getInstance().useEmulator(firebaseEmulatorHost, 5001)
      FirebaseFirestore.getInstance().firestoreSettings = FirebaseFirestoreSettings.Builder()
        .setLocalCacheSettings(MemoryCacheSettings.newBuilder().build())
        .build()
      Log.d("MainApplication", "Using firebase emulators")
    }

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
    {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }
}
