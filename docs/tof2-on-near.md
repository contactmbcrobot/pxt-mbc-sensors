# on distance 2-ch nearer than cm cm

Run code when the nearest distance drops below the given cm (once per approach).

```sig
mbc.onTof2Near(cm)
```

## Parameters

* **cm**: distance in cm, eg: 10

## Example

```blocks
mbc.onTof2Near(10, function () {
    basic.showIcon(IconNames.Happy)
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
