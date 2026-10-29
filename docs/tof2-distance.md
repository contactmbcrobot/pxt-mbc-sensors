# distance 2-ch side (unit)

Distance of the left or right sensor in cm or mm; no target = the max distance (120 cm by default, 200 cm in long-range mode).

```sig
mbc.tof2Distance(side, unit)
```

## Parameters

* **side**: which sensor
* **unit**: cm or mm

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof2Distance(MbcTofSide.Left, MbcDistUnit.Cm))
    basic.pause(200)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
