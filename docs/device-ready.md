# device at addr is ready

True when the device at this address answers and reports ready (F3 bit0).

```sig
mbc.deviceReady(addr)
```

## Parameters

* **addr**: I2C address

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.deviceReady(mbc.ADDR_LINE)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[micro:bit guide](https://mbc-pro-sensors.github.io/en/microbit.html), [I2C protocol](https://mbc-pro-sensors.github.io/en/i2c-protocol.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
