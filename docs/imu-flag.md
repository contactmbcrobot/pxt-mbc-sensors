# IMU is flag

True when the IMU status flag is set.

```sig
mbc.imuFlag(flag)
```

## Parameters

* **flag**: status flag

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.imuFlag(MbcImuFlag.Still)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
