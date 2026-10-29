# gamepad pair again

Forget the bonded gamepad and open a 30 s pairing window (E0 with code A5, same as the Reset button).

```sig
mbc.padPairAgain()
```

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padPairAgain()
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
