# distance 8-ch sensor n is OK

True when sensor n is initialised and not faulty.

```sig
mbc.tof8SensorOk(n)
```

## Parameters

* **n**: sensor number 1..8, eg: 1

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.tof8SensorOk(1)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
