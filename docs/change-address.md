# change device at addr to address newAddr

Change the I2C address (F8 [new][~new]), saved to EEPROM; takes effect after reboot.

```sig
mbc.changeAddress(addr, newAddr)
```

## Parameters

* **addr**: current I2C address
* **newAddr**: new address 0x08..0x77

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.changeAddress(mbc.ADDR_LINE, 23)
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
