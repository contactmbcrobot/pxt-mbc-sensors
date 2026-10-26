# camera spot n is kind

WRO edition: true when spot n is a colour (0..239), white (240..245), black (246..250) or off (255). False for every kind when the camera does not answer (not connected or not the WRO edition).

```sig
mbc.camSpotIs(n, kind)
```

## Parameters

* **n**: spot number 1..12, eg: 1
* **kind**: colour / white / black / off

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.camSpotIs(1, MbcCamSpotKind.Colour)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
