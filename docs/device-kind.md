# device at addr kind

Device kind (F0 high byte): line follower = channels (8/16), distance = sensors (2/8), gamepad 1 = PS2 / 2 = PS4, IMU = 1, camera 1 = school / 2 = WRO.

```sig
mbc.deviceKind(addr)
```

## Parameters

* **addr**: I2C address

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.deviceKind(mbc.ADDR_LINE))
    basic.pause(200)
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
