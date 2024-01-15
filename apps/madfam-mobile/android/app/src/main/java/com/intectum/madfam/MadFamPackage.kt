package com.intectum.madfam

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MadFamPackage : ReactPackage
{
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>>
  {
    return emptyList()
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule>
  {
    val modules = ArrayList<NativeModule>()
    modules.add(MadFamModule(reactContext))

    return modules
  }
}
