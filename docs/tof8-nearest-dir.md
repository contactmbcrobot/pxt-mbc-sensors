# distance 8-ch nearest direction

Direction of the nearest object: -8..+8, 0 = straight ahead, negative = left, +-8 = nothing seen.

```sig
mbc.tof8NearestDirection()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof8NearestDirection())
    basic.pause(200)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
