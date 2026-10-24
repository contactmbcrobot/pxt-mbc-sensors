# distance 2-ch average (mm)

Average of left and right in mm (same as EV3 mode 3 / SPIKE mode 6).

```sig
mbc.tof2AverageMm()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof2AverageMm())
    basic.pause(200)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
