# wait for device at addr ready, timeout timeout ms

Wait until the device is ready, up to timeout ms. Returns false on timeout.

```sig
mbc.waitReady(addr, timeout)
```

## Parameters

* **addr**: I2C address
* **timeout**: maximum wait in ms, eg: 5000

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.waitReady(mbc.ADDR_LINE, 5000)) {
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
