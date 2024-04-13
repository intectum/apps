package com.vaga

import androidx.work.PeriodicWorkRequest
import androidx.work.WorkManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.firebase.ui.auth.AuthUI
import com.google.firebase.auth.FirebaseAuth
import java.util.concurrent.TimeUnit

class VagaModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context)
{
  override fun getName(): String = "VagaModule"

  @ReactMethod
  fun addListener(eventName: String?) {}

  @ReactMethod
  fun removeListeners(count: Int?) {}

  @ReactMethod
  fun getCurrentUserId(promise: Promise)
  {
    val user = FirebaseAuth.getInstance().currentUser
    if (user == null)
    {
      promise.resolve(null)
      return
    }
    promise.resolve(user.uid)
  }

  @ReactMethod
  fun getGoogleApiKey(promise: Promise)
  {
    promise.resolve(reactApplicationContext.getString(R.string.google_api_key))
  }

  @ReactMethod
  fun signIn()
  {
    val activity = currentActivity as MainActivity?
    activity!!.signIn(this)
  }

  // TODO possible from MainActivity?
  fun signInComplete()
  {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("signInComplete", null)
  }

  @ReactMethod
  fun signOut(promise: Promise)
  {
    AuthUI.getInstance()
      .signOut(currentActivity!!)
      .addOnCompleteListener {
        _ ->
          promise.resolve(null)
          reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("signOutComplete", null)
      }
  }

  @ReactMethod
  fun updateFcmToken(promise: Promise)
  {
    FcmTokenUpdate
        .update(reactApplicationContext)
        .addOnCompleteListener {
          task ->
            if (!task.isSuccessful)
            {
              promise.reject(task.exception)
            }
            else
            {
              promise.resolve(task.result)
            }
        }
  }

  @ReactMethod
  fun updateFcmTokenInBackground(interval: Int)
  {
    val workManager = WorkManager.getInstance(reactApplicationContext)

    // Cancel the existing schedule if any.
    workManager.cancelAllWorkByTag("fcm-token-update")
    val request = PeriodicWorkRequest.Builder(FcmTokenUpdateWorker::class.java, interval.coerceAtLeast(15).toLong(), TimeUnit.MINUTES)
      .addTag("fcm-token-update")
      .build()
    workManager.enqueue(request)
  }

  @ReactMethod
  fun updateLocation(promise: Promise)
  {
    LocationUpdate
      .update(reactApplicationContext)
      .addOnCompleteListener {
        task ->
          if (!task.isSuccessful())
          {
            promise.reject(task.getException())
          }
          else
          {
            promise.resolve(task.getResult())
          }
      }
  }

  @ReactMethod
  fun updateLocationInBackground(interval: Int)
  {
    val workManager = WorkManager.getInstance(reactApplicationContext)

    // Cancel the existing schedule if any.
    workManager.cancelAllWorkByTag("location-update")
    val request = PeriodicWorkRequest.Builder(LocationUpdateWorker::class.java, interval.coerceAtLeast(15).toLong(), TimeUnit.MINUTES)
      .addTag("location-update")
      .build()
    workManager.enqueue(request)
  }
}
