# IMU heading kind (°)

Heading in degrees (keeps counting past 360, negative = turned left). Fused = gyro + magnetometer.

```sig
mbc.imuHeading(kind)
```

## Parameters

* **kind**: heading source

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.imuHeading(MbcImuHeading.Fused))
    basic.pause(200)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
