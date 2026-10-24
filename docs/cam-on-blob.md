# on camera blob event

Run code when the school-edition camera finds or loses the blob.

```sig
mbc.onCamBlob(event)
```

## Parameters

* **event**: found or lost

## Example

```blocks
mbc.onCamBlob(MbcCamEvent.Found, function () {
    basic.showIcon(IconNames.Happy)
})
```

## See also

[Sharpshooter camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
