# restore factory address of device at addr

Restore the factory I2C address (F8 [0x00][0xFF]); takes effect after reboot.

```sig
mbc.resetAddress(addr)
```

## Parameters

* **addr**: current I2C address

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.resetAddress(mbc.ADDR_LINE)
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
