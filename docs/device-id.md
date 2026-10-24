# device at addr factory id

Factory I2C address of the device (F0 low byte), unchanged after re-addressing.

```sig
mbc.deviceId(addr)
```

## Parameters

* **addr**: I2C address

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.deviceId(mbc.ADDR_LINE))
    basic.pause(200)
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
