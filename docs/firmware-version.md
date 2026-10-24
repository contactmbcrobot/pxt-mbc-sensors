# device at addr firmware version

Firmware version as "major.minor" (F2 = major*100 + minor). Empty when no device.

```sig
mbc.firmwareVersion(addr)
```

## Parameters

* **addr**: I2C address

## Returns

* a text string.

## Example

```blocks
basic.forever(function () {
    basic.showString(mbc.firmwareVersion(mbc.ADDR_LINE))
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
