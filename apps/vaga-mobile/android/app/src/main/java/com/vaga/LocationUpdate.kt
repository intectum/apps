package com.vaga

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.util.Log
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.Task
import com.google.android.gms.tasks.TaskCompletionSource
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.functions.FirebaseFunctions
import com.vaga.Dates.today

object LocationUpdate
{
  fun update(context: Context?, background: Boolean = false): Task<Boolean>
  {
    val taskCompletionFalseSource = TaskCompletionSource<Boolean>()
    taskCompletionFalseSource.setResult(false)

    val uid = FirebaseAuth.getInstance().uid
    if (uid == null)
    {
      Log.d("LocationUpdate", "User not logged in")
      return taskCompletionFalseSource.task
    }

    val permission = if (background) Manifest.permission.ACCESS_BACKGROUND_LOCATION else Manifest.permission.ACCESS_COARSE_LOCATION
    if (ActivityCompat.checkSelfPermission(context!!, permission) != PackageManager.PERMISSION_GRANTED)
    {
      Log.d("LocationUpdate", "Permission not granted")
      return taskCompletionFalseSource.task
    }

    return LocationServices
      .getFusedLocationProviderClient(context)
      .getCurrentLocation(Priority.PRIORITY_BALANCED_POWER_ACCURACY, null)
      .continueWithTask { locationTask ->
        val location = locationTask.result
        if (location == null)
        {
          Log.d("LocationUpdate", "Location unknown")
          return@continueWithTask taskCompletionFalseSource.task
        }

        FirebaseAnalytics.getInstance(context).logEvent("update_location", null)

        val locationData = hashMapOf(
          "latitude" to location.latitude,
          "longitude" to location.longitude
        )

        val updatedAt = today()
        val updatedAtData = hashMapOf(
          "year" to updatedAt.year,
          "month" to updatedAt.month,
          "day" to updatedAt.day
        )

        val data = hashMapOf(
          "location" to locationData,
          "updatedAt" to updatedAtData
        )

        FirebaseFunctions.getInstance()
          .getHttpsCallable("updateLocation")
          .call(data)
          .continueWith<Boolean> { _ -> true }
      }
  }
}
