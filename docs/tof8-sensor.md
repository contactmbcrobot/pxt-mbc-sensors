# distance 8-ch sensor n (unit)

Distance of one sensor (1 = leftmost .. 8 = rightmost) in cm or mm.

```sig
mbc.tof8Sensor(n, unit)
```

## Parameters

* **n**: sensor number 1..8, eg: 1
* **unit**: cm or mm

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof8Sensor(1, MbcDistUnit.Cm))
    basic.pause(200)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
