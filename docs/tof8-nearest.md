# distance 8-ch nearest (unit)

Nearest distance of all 8 sensors, in cm (0..120) or mm (0..1200).

```sig
mbc.tof8Nearest(unit)
```

## Parameters

* **unit**: cm or mm

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof8Nearest(MbcDistUnit.Cm))
    basic.pause(200)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
