# distance 2-ch range mode mode

Set the range mode (E0). Also resets update time and max distance to the mode defaults, so send it first. RAM only.

```sig
mbc.tof2SetMode(mode)
```

## Parameters

* **mode**: range mode

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof2SetMode(MbcTofMode.Normal)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
