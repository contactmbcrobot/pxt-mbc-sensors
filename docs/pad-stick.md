# gamepad joystick axis

Joystick axis -100..+100, 0 = centre, right / up = positive.

```sig
mbc.padStick(axis)
```

## Parameters

* **axis**: joystick axis

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.padStick(MbcPadAxis.LeftX))
    basic.pause(200)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
