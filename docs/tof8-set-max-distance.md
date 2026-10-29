# distance 8-ch max distance cm cm

Set the max distance in cm (E4); farther counts as "no target". 0 = max of the current mode. RAM only.

```sig
mbc.tof8SetMaxDistance(cm)
```

## Parameters

* **cm**: 0 or 10..200, eg: 120

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof8SetMaxDistance(120)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
