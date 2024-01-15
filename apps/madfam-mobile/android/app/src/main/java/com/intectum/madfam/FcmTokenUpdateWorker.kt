package com.intectum.madfam

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.intectum.madfam.FcmTokenUpdate.update

class FcmTokenUpdateWorker(context: Context, params: WorkerParameters) : Worker(context, params)
{
  override fun doWork(): Result
  {
    update(applicationContext)

    return Result.success()
  }
}
