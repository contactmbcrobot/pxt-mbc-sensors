# on line event

Run code when the line is lost, found again, or a fork / crossing appears.

```sig
mbc.onLineEvent(event)
```

## Parameters

* **event**: line event

## Example

```blocks
mbc.onLineEvent(MbcLineEvent.Lost, function () {
    basic.showIcon(IconNames.Happy)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
