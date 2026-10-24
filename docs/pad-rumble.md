# gamepad rumble strength strength

Rumble the PS4 / PS5 gamepad (E5). 0 = stop. PS2 ignores this.

```sig
mbc.padRumble(strength)
```

## Parameters

* **strength**: 0..255, eg: 200

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padRumble(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
