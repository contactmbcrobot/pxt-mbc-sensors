# IMU action

Maintenance (E7 / E8 / EB): re-estimate the gyro bias (keep still about 1.5 s), re-capture the mounting axis, or reset all calibration to factory values.

```sig
mbc.imuMaintenance(action)
```

## Parameters

* **action**: what to do

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.imuMaintenance(MbcImuMaint.GyroBias)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
