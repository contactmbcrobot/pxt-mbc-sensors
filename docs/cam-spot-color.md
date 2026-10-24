# camera spot n colour code

WRO edition: colour code of spot n (1..12): 0..239 = colour hue, 240..245 = white, 246..250 = black, 255 = spot off.

```sig
mbc.camSpotColor(n)
```

## Parameters

* **n**: spot number 1..12, eg: 1

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.camSpotColor(1))
    basic.pause(200)
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
