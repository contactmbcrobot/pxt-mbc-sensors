# IMU pitch rate (0.1 °/s)

Pitch rate in 0.1 °/s.

```sig
mbc.imuPitchRate()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.imuPitchRate())
    basic.pause(200)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
