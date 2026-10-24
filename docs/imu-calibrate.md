# IMU calibration step

Start or end an accelerometer / magnetometer calibration (E1..E4). Results are saved in the IMU.

```sig
mbc.imuCalibrate(step)
```

## Parameters

* **step**: calibration step

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.imuCalibrate(MbcImuCalib.AccelStart)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
