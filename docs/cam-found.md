# camera blob is found

True when the school-edition camera sees a blob of the target colour.

```sig
mbc.camFound()
```

## Returns

* `true` or `false`.

## Example

```blocks
basic.forever(function () {
    if (mbc.camFound()) {
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
