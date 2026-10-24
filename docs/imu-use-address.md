# IMU use address addr

Use an IMU whose I2C address was changed (default 0x6A).

```sig
mbc.imuUseAddress(addr)
```

## Parameters

* **addr**: I2C address

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.imuUseAddress(mbc.ADDR_IMU)
})
```

## See also

[IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
