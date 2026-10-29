# distance 2-ch max distance cm cm

Set the max distance in cm (E4); farther counts as "no target". 0 = max of the current mode. RAM only.

```sig
mbc.tof2SetMaxDistance(cm)
```

## Parameters

* **cm**: 0 or 10..200, eg: 120

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof2SetMaxDistance(120)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
