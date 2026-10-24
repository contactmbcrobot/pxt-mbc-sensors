# channel n is on the line

True when channel n (1 = leftmost) is on the line.

```sig
mbc.lineChannelOnLine(n)
```

## Parameters

* **n**: channel number 1..16, eg: 1

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.lineChannelOnLine(1)) {
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
