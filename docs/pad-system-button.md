# gamepad system button button is pressed

True while the PS or capture button is held down (PS4 / PS5 only).

```sig
mbc.padSystemButtonPressed(button)
```

## Parameters

* **button**: system button

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.padSystemButtonPressed(MbcPadSystemButton.Ps)) {
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
