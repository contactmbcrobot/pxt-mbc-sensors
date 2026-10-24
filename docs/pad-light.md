# gamepad light bar colour color

Set the PS4 / PS5 light bar colour (E6 [R][G][B]). PS2 ignores this.

```sig
mbc.padLight(color)
```

## Parameters

* **color**: RGB colour, eg: 0xFF0000

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padLight(0xff0000)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
