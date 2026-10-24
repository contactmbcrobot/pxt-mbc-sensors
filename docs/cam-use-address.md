# camera use address addr

Use a camera whose I2C address was changed (default 0x4C).

```sig
mbc.camUseAddress(addr)
```

## Parameters

* **addr**: I2C address

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.camUseAddress(mbc.ADDR_CAM)
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
