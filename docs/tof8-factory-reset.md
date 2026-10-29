# distance 8-ch factory reset

Back to factory settings (E3 with code A5): normal mode, median of 3, defaults.

```sig
mbc.tof8FactoryReset()
```

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof8FactoryReset()
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
