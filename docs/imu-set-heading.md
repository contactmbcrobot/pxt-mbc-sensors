# IMU set heading to degrees °

Set all headings to the given angle (E5, int16). Rejected while calibrating.

```sig
mbc.imuSetHeading(degrees)
```

## Parameters

* **degrees**: heading in degrees, eg: 90

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.imuSetHeading(90)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
