# channel n reflect

Calibrated reflect value of channel n, 0 = black .. 100 = white.

```sig
mbc.lineChannel(n)
```

## Parameters

* **n**: channel number 1..16, 1 = leftmost, eg: 1

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.lineChannel(1))
    basic.pause(200)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
