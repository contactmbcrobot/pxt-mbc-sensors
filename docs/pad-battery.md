# gamepad battery percent

Gamepad battery 0..100 (PS4 / PS5; PS2 always 0).

```sig
mbc.padBattery()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.padBattery())
    basic.pause(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
