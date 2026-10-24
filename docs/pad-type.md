# gamepad type

Gamepad type: 0 none, 1 PS2 digital, 2 PS2 analog, 3 PS4, 4 PS5.

```sig
mbc.padType()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.padType())
    basic.pause(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
