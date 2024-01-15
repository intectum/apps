package com.intectum.madfam

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.intectum.madfam.LocationUpdate.update

class LocationUpdateWorker(context: Context, params: WorkerParameters) : Worker(context, params)
{
  override fun doWork(): Result
  {
    update(applicationContext, true)

    return Result.success()
  }
}
