# line follower calibrate mode

Calibrate the line follower (saved to EEPROM). Black / white: ~50 ms; auto: sweep over black line and white surface for 5 s.

```sig
mbc.lineCalibrate(mode)
```

## Parameters

* **mode**: calibration mode

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.lineCalibrate(MbcLineCalib.Black)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
