# distance 2-ch update time ms ms

Set the time per measurement 20..200 ms (E2); 0 = default of the current mode. RAM only.

```sig
mbc.tof2SetUpdateTime(ms)
```

## Parameters

* **ms**: 0 or 20..200, eg: 33

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof2SetUpdateTime(33)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
