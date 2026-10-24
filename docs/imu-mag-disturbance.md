# IMU magnetic disturbance

Magnetic disturbance level 0..255 (higher = more interference).

```sig
mbc.imuMagDisturbance()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.imuMagDisturbance())
    basic.pause(200)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
