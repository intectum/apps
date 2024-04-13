package com.vaga

import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.firebase.ui.auth.AuthUI
import com.firebase.ui.auth.AuthUI.IdpConfig
import com.firebase.ui.auth.AuthUI.IdpConfig.EmailBuilder
import com.firebase.ui.auth.AuthUI.IdpConfig.GoogleBuilder
import com.firebase.ui.auth.FirebaseAuthUIActivityResultContract
import com.firebase.ui.auth.data.model.FirebaseAuthUIAuthenticationResult
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.appdistribution.FirebaseAppDistribution
import com.google.firebase.appdistribution.InterruptionLevel

class MainActivity : ReactActivity()
{
  private var module: VagaModule? = null

  private val signInLauncher = registerForActivityResult(FirebaseAuthUIActivityResultContract())
  {
    result: FirebaseAuthUIAuthenticationResult ->
      module?.signInComplete()
      val bundle = Bundle()
      bundle.putString(FirebaseAnalytics.Param.METHOD, result.idpResponse!!.providerType)
      FirebaseAnalytics.getInstance(this).logEvent(FirebaseAnalytics.Event.LOGIN, bundle)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "vaga"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?)
  {
    super.onCreate(null)

    FirebaseAppDistribution
      .getInstance()
      .showFeedbackNotification(R.string.feedback_message, InterruptionLevel.HIGH)
  }

  override fun onConfigurationChanged(newConfig: Configuration)
  {
    super.onConfigurationChanged(newConfig)

    val intent = Intent("onConfigurationChanged")
    intent.putExtra("newConfig", newConfig)
    this.sendBroadcast(intent)
  }

  fun signIn(module: VagaModule?)
  {
    this.module = module
    val providers = ArrayList<IdpConfig>()

    providers.add(
      GoogleBuilder()
        .setSignInOptions(
        GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
          .requestIdToken(getString(R.string.default_web_client_id))
          .requestEmail()
          .build()
        )
        .build()
    )

    providers.add(
      EmailBuilder()
        .setRequireName(true)
        .build()
    )

    val signInIntent = AuthUI.getInstance()
      .createSignInIntentBuilder()
      .setAvailableProviders(providers)
      .setTheme(R.style.AppTheme)
      .build()

    signInLauncher.launch(signInIntent)
  }
}
