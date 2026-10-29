# IMU wait for command to finish (timeout timeout ms)

Wait until the last command is no longer busy (or the timeout passes). True = it finished as "done".

```sig
mbc.imuWaitCommand(timeout)
```

## Parameters

* **timeout**: max wait in ms, eg: 5000

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.imuWaitCommand(5000)) {
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
