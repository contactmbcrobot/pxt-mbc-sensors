# line follower follow color line

Follow a black (default) or a white line.

```sig
mbc.lineSetColor(color)
```

## Parameters

* **color**: line colour

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.lineSetColor(MbcLineColor.Black)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
