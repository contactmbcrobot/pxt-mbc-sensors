# reboot device at addr

Reboot the device (EF A5).

```sig
mbc.reboot(addr)
```

## Parameters

* **addr**: I2C address

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.reboot(mbc.ADDR_LINE)
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
