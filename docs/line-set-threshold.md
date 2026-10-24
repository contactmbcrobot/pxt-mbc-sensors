# line follower set threshold threshold

Set the reflect threshold 1..99 for "on line" (RAM only, back to 50 after reboot).

```sig
mbc.lineSetThreshold(threshold)
```

## Parameters

* **threshold**: 1..99, eg: 50

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.lineSetThreshold(50)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
