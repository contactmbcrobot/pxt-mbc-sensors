# distance 8-ch front (unit)

Distance straight ahead (average of sensors 4 and 5) in cm (0..120) or mm (0..1200).

```sig
mbc.tof8Front(unit)
```

## Parameters

* **unit**: cm or mm

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof8Front(MbcDistUnit.Cm))
    basic.pause(200)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
