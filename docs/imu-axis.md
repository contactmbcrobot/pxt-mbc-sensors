# IMU sensor axis axis

Raw sensor axis: gyro in 0.1 °/s, accelerometer in mg, magnetometer in mG.

```sig
mbc.imuAxis(sensor, axis)
```

## Parameters

* **sensor**: which sensor
* **axis**: X, Y or Z

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.imuAxis(MbcImuSensor.Gyro, MbcAxis.X))
    basic.pause(200)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
