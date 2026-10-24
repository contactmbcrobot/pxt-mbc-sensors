# on IMU turned by degrees °

Run code every time the fused heading has changed by the given degrees since the last event.

```sig
mbc.onImuTurned(degrees)
```

## Parameters

* **degrees**: turn in degrees, eg: 90

## Example

```blocks
mbc.onImuTurned(90, function () {
    basic.showIcon(IconNames.Happy)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
