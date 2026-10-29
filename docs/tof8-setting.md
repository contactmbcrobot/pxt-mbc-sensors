# distance 8-ch setting

Read back a setting: range mode, filter, update time (ms) or max distance (cm).

```sig
mbc.tof8Setting(setting)
```

## Parameters

* **setting**: which setting

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof8Setting(MbcTofSetting.Mode))
    basic.pause(200)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
