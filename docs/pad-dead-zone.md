# gamepad stick dead zone (percent) percent

Stick dead zone 0..50 % (E9): small stick moves inside it read 0. Back to about 6 % after power-off.

```sig
mbc.padDeadZone(percent)
```

## Parameters

* **percent**: 0..50, eg: 6

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padDeadZone(6)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
