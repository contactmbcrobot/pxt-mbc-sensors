# gamepad save light bar colour for power-on save

Save the current light bar colour as the power-on colour, or go back to the factory blue (E8).

```sig
mbc.padSaveLight(save)
```

## Parameters

* **save**: true = save current colour, false = back to blue, eg: true

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.padSaveLight(true)
})
```

## See also

[Controller PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html), [Controller PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
