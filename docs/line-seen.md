# line is seen

True when at least one line segment is under the sensor.

```sig
mbc.lineSeen()
```

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.lineSeen()) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
