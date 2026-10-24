# distance 2-ch side sensor is OK

True when the left or right sensor is initialised and not faulty.

```sig
mbc.tof2SensorOk(side)
```

## Parameters

* **side**: which sensor

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.tof2SensorOk(MbcTofSide.Left)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
