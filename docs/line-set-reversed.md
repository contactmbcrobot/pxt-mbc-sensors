# line follower swap left and right on

Swap left and right (E9) when the sensor is mounted backwards: channel order and line position are mirrored. RAM only, off after reboot; no need to recalibrate.

```sig
mbc.lineSetReversed(on)
```

## Parameters

* **on**: true = mirrored, eg: true

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.lineSetReversed(true)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
