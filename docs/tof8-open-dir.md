# distance 8-ch most open direction

Direction of the most open (farthest) side: -7..+7, negative = left.

```sig
mbc.tof8OpenDirection()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof8OpenDirection())
    basic.pause(200)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
