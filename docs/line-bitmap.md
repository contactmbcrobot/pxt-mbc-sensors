# line bitmap

Line bitmap: bit0 = channel 1 (leftmost) ... bit15 = channel 16; 1 = that channel sees the line.

```sig
mbc.lineBitmap()
```

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.lineBitmap())
    basic.pause(200)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
