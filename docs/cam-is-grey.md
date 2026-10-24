# camera colour is black / white / grey

True when the centre colour has no hue (black, white or grey).

```sig
mbc.camIsGrey()
```

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.camIsGrey()) {
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
