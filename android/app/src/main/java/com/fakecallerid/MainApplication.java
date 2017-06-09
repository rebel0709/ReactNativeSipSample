package com.fakecallerid;

import android.app.Application;

import com.facebook.react.ReactApplication;


import com.zmxv.RNSound.RNSoundPackage;

import com.carusto.ReactNativePjSip.PjSipModulePackage;

import com.BV.LinearGradient.LinearGradientPackage;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
	          new MainReactPackage(),

			  new VectorIconsPackage(),

            
			new LinearGradientPackage(),
		    new RNDeviceInfo(),
            new RNSoundPackage(),
            new PjSipModulePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
