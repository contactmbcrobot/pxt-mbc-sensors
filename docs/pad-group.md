# gamepad group buttons (0-15)

One 4-button group as a 0..15 nibble: d-pad (up 1, right 2, down 4, left 8), shapes (triangle 1, circle 2, cross 4, square 8), shoulders (L2 1, R2 2, L1 4, R1 8), functions (select 1, L3 2, R3 4, start 8).

```sig
mbc.padGroup(group)
```

## Parameters

* **group**: button group

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.padGroup(MbcPadGroup.Dpad))
    basic.pause(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
