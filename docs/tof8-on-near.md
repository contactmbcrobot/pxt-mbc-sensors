# on distance 8-ch nearer than cm cm

Run code when the nearest object comes closer than the given cm (once per approach).

```sig
mbc.onTof8Near(cm)
```

## Parameters

* **cm**: distance in cm, eg: 10

## Example

```blocks
mbc.onTof8Near(10, function () {
    basic.showIcon(IconNames.Happy)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
