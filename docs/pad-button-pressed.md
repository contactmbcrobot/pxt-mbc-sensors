# gamepad button button is pressed

True while the button is held down.

```sig
mbc.padButtonPressed(button)
```

## Parameters

* **button**: gamepad button

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.padButtonPressed(MbcPadButton.Select)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
