# gamepad rumble strength strength for ms ms

Rumble the PS4 / PS5 gamepad for a time, then stop by itself (E7). PS2 ignores this.

```sig
mbc.padRumbleFor(strength, ms)
```

## Parameters

* **strength**: 0..255, eg: 200
* **ms**: time in ms (10..2550), eg: 500

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padRumbleFor(200, 500)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
