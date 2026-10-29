# gamepad PS5 player LEDs bits

PS5 player LEDs (EA): bit 0..4 = the 5 LEDs, 0..31. Sent again every time the gamepad reconnects. PS4 has no player LEDs.

```sig
mbc.padPlayerLeds(bits)
```

## Parameters

* **bits**: 0..31, eg: 4

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padPlayerLeds(4)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
