# IMU face up is face

True when the given face points up.

```sig
mbc.imuFaceUpIs(face)
```

## Parameters

* **face**: which face

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.imuFaceUpIs(MbcImuFace.PlusX)) {
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
