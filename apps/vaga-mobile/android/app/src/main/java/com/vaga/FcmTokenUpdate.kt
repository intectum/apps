package com.vaga

import android.content.Context
import android.util.Log
import com.google.android.gms.tasks.Task
import com.google.android.gms.tasks.TaskCompletionSource
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.messaging.FirebaseMessaging
import java.util.Date

object FcmTokenUpdate
{
  fun update(context: Context): Task<Boolean>
  {
    val taskCompletionFalseSource = TaskCompletionSource<Boolean>()
    taskCompletionFalseSource.setResult(false)

    val uid = FirebaseAuth.getInstance().uid
    if (uid == null)
    {
      Log.e("FcmTokenUpdate", "User not logged in")
      return taskCompletionFalseSource.task
    }

    return FirebaseMessaging
      .getInstance()
      .token
      .continueWithTask {
        tokenTask ->
          val fcmToken = tokenTask.result

          FirebaseAnalytics.getInstance(context).logEvent("update_fcm_token", null)

          val data = hashMapOf<String, Any>(
            "fcm.token" to fcmToken,
            "fcm.tokenUpdatedAt" to Date()
          )

          FirebaseFirestore
            .getInstance()
            .collection("users/$uid/userPrivates")
            .document("private")
            .update(data)
      }
      .continueWith { _ -> true }
  }
}
