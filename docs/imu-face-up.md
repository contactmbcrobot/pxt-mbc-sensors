# IMU face up

Which face points up: 0 +X, 1 +Y, 2 +Z, 3 -X, 4 -Y, 5 -Z.

```sig
mbc.imuFaceUp()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.imuFaceUp())
    basic.pause(200)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
