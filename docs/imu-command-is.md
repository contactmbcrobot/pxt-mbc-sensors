# IMU last command is state

True when the last command (E1..EB) is in the given state (value 0B: done, busy, failed, rejected).

```sig
mbc.imuCommandIs(state)
```

## Parameters

* **state**: command state

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.imuCommandIs(MbcImuCmdState.Done)) {
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
