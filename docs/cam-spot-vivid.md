# camera spot n vividness

WRO edition: vividness (saturation) of spot n (1..12).

```sig
mbc.camSpotVivid(n)
```

## Parameters

* **n**: spot number 1..12, eg: 1

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.camSpotVivid(1))
    basic.pause(200)
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
