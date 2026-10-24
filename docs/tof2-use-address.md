# distance 2-ch use address addr

Use a 2-ch distance sensor whose I2C address was changed (default 0x29).

```sig
mbc.tof2UseAddress(addr)
```

## Parameters

* **addr**: I2C address

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof2UseAddress(mbc.ADDR_TOF)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
