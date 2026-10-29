# distance 2-ch factory reset

Back to factory settings (E3 with code A5): normal mode, median of 3, defaults.

```sig
mbc.tof2FactoryReset()
```

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof2FactoryReset()
})
```

## See also

[Ranger 2-way](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
