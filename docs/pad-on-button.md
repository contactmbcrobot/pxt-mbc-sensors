# on gamepad button button event

Run code when a gamepad button is pressed or released.

```sig
mbc.onPadButton(button, event)
```

## Parameters

* **button**: gamepad button
* **event**: pressed or released

## Example

```blocks
mbc.onPadButton(MbcPadButton.Select, MbcPadButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
