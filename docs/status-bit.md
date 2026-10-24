# device at addr status bit bit

True when status bit (0..7) is set.

```sig
mbc.statusBit(addr, bit)
```

## Parameters

* **addr**: I2C address
* **bit**: bit number 0..7, eg: 1

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.statusBit(mbc.ADDR_LINE, 1)) {
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
