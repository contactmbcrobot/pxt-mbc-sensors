# IMU heading from magnetic north

Make the gyro heading show the magnetic compass direction 0..359 (E6, magnetic north = 0). Takes up to about 3 s. Rejected while calibrating.

```sig
mbc.imuZeroNorth()
```

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.imuZeroNorth()
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
