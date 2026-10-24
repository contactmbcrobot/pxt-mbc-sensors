# gamepad trigger trigger analog

Analog pressure of L2 / R2, 0..255 (PS2 digital pads report 255 when pressed).

```sig
mbc.padTrigger(trigger)
```

## Parameters

* **trigger**: L2 or R2

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.padTrigger(MbcPadTrigger.L2))
    basic.pause(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
