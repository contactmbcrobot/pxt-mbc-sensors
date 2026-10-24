# MBC Pro Sensors for micro:bit

> Open this page at [https://contactmbcrobot.github.io/pxt-mbc-sensors/](https://contactmbcrobot.github.io/pxt-mbc-sensors/)

MakeCode extension for **MBC Pro Sensors** on BBC micro:bit V1 and V2 (MBC I2C protocol v2, 2026-10).
Product site: [https://mbc-pro-sensors.github.io/](https://mbc-pro-sensors.github.io/) (繁體中文／English).

| Product | I2C address | Group | micro:bit page |
|---|---|---|---|
| Line follower 8-ch / 16-ch (循行者) | 0x16 | Line | [line8](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html) · [line16](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html) |
| Distance sensor 2-ch / 8-ch (測距者) | 0x29 | Distance | [tof2](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html) · [tof8](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html) |
| Gamepad receiver PS2 / PS4 (掌控者) | 0x42 | Gamepad | [ps2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html) · [ps4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html) |
| IMU / gyro (陀螺儀) | 0x6A | IMU | [imu](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html) |
| ESP32 camera, school / WRO edition (神攝手) | 0x4C | Camera | [esp32cam](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html) |

Wiring: MBC 4-pin cable to the micro:bit edge connector, **P19 = SCL, P20 = SDA**, 3V and GND.
Several products can share the bus as long as their addresses differ (change an address with the *Device* blocks).
Products that draw more than the micro:bit 3V pin can supply (distance 8-ch, ESP32 products) need their own power.

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/contactmbcrobot/pxt-mbc-sensors** and import

Traditional Chinese block names are included (`_locales/zh-TW`): switch the editor language to 繁體中文.

## Blocks

### Line follower

```blocks
mbc.lineCalibrate(MbcLineCalib.Auto)
basic.forever(function () {
    basic.showNumber(mbc.linePosition())
    if (mbc.lineChannelOnLine(1)) {
        basic.showIcon(IconNames.ArrowWest)
    }
})
mbc.onLineEvent(MbcLineEvent.Lost, function () {
    basic.showIcon(IconNames.No)
})
```

### Distance sensor

```blocks
basic.forever(function () {
    basic.showNumber(mbc.tof2Distance(MbcTofSide.Left, MbcDistUnit.Cm))
    basic.showNumber(mbc.tof8Nearest(MbcDistUnit.Mm))
    basic.showNumber(mbc.tof8NearestDirection())
})
mbc.onTof8Near(10, function () {
    basic.showIcon(IconNames.Skull)
})
```

### Gamepad

```blocks
mbc.onPadButton(MbcPadButton.Cross, MbcPadButtonEvent.Pressed, function () {
    mbc.padRumble(200)
    mbc.padLight(0xff0000)
})
basic.forever(function () {
    if (mbc.padConnected()) {
        basic.showNumber(mbc.padStick(MbcPadAxis.LeftY))
    }
})
```

### IMU

```blocks
mbc.imuZeroHeading()
basic.forever(function () {
    basic.showNumber(mbc.imuHeading(MbcImuHeading.Fused))
    basic.showNumber(mbc.imuPitch())
})
mbc.onImuTurned(90, function () {
    basic.showIcon(IconNames.Yes)
})
```

### Camera

```blocks
basic.forever(function () {
    if (mbc.camFound()) {
        basic.showNumber(mbc.camBlob(MbcCamBlob.X))
    }
    basic.showNumber(mbc.camSpotColor(1))
})
```

### Device (advanced)

```blocks
if (mbc.waitReady(mbc.ADDR_LINE, 5000)) {
    basic.showString(mbc.firmwareVersion(mbc.ADDR_LINE))
    basic.showNumber(mbc.deviceKind(mbc.ADDR_LINE))
}
```

## Protocol v2 in short

* Read: write `[id]`, wait 2 ms, read `2 × k` bytes = `k` consecutive **int16 little-endian** values (`k ≤ 16`). Undefined ids read as `-32768`.
* Common ids: `F0` device id (low byte = factory address, high byte = kind), `F1` protocol version (2), `F2` firmware version (major×100+minor), `F3` status flags (bit0 = ready), `F4` update counter, `F5` uptime seconds.
* Commands: `E0`–`EE` per product, `F8 [new][~new]` change address (`F8 00 FF` = factory), `EF A5` reboot.
* Full value tables: [https://mbc-pro-sensors.github.io/en/i2c-protocol.html](https://mbc-pro-sensors.github.io/en/i2c-protocol.html)

## Block help

Right-click any block → **Help** opens its page in [`docs/`](docs/) (description, parameters, a runnable example and the product guide link).

## Test

`test.ts` calls every block. In the simulator all I2C reads return 0 and nothing must crash.
On hardware connect a sensor to P19/P20, open the serial console and press **A** for device info; the product values are streamed every 500 ms.

## License

MIT — Shaobo Creative Robotics Company Limited (MBC Robot)

## Supported targets

* for PXT/microbit

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
