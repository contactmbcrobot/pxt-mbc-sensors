# line follower use address addr

Use a line follower whose I2C address was changed (default 0x16).

```sig
mbc.lineUseAddress(addr)
```

## Parameters

* **addr**: I2C address

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.lineUseAddress(mbc.ADDR_LINE)
})
```

## See also

[Pathfinder 8-way](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html), [Pathfinder 16-way](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
