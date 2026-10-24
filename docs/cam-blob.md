# camera blob what

Blob position and size (school edition): X 0..100, Y 0..75, width 0..100, height 0..75, area = width x height.

```sig
mbc.camBlob(what)
```

## Parameters

* **what**: which blob value

## Returns

* a number.

## Example

```blocks
basic.forever(function () {
    basic.showNumber(mbc.camBlob(MbcCamBlob.X))
    basic.pause(200)
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
