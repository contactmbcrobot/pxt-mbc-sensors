# IMU heading correction tenths (0.1 ° per turn)

Heading correction (EA): real degrees per full turn x 10, 3500..3700; 0 = back to 360.0. Saved in the IMU, heading is zeroed.

```sig
mbc.imuHeadingCorrection(tenths)
```

## Parameters

* **tenths**: 0 or 3500..3700, eg: 3600

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.imuHeadingCorrection(3600)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
