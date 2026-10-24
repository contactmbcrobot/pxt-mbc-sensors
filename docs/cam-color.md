# camera colour what

Colour at the centre (school edition): hue 0..100 (-1 = black / white / grey), saturation 0..100, brightness 0..100.

```sig
mbc.camColor(what)
```

## Parameters

* **what**: which colour value

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.camColor(MbcCamColor.Hue))
    basic.pause(200)
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
