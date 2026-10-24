# gamepad buttons bit mask

All 16 buttons as a bit mask (PSX layout: bit0 select, 1 L3, 2 R3, 3 start, 4 up, 5 right, 6 down, 7 left, 8 L2, 9 R2, 10 L1, 11 R1, 12 triangle, 13 circle, 14 cross, 15 square).

```sig
mbc.padButtons()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.padButtons())
    basic.pause(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
